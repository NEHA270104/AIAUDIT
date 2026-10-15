/**
 * /api/contact — POST handler for the AI Audit Discovery Call form.
 *
 * Validates the submitted fields, generates submittedAt, and triggers the
 * MSG91 email notification. Lead data is intentionally not persisted to a
 * database in this project (no database exists), but a full success response
 * is returned as long as validation passes — email failures do not surface as
 * form errors so the user experience is preserved.
 *
 * This module is loaded only inside the Vite dev server (Node.js). It is
 * never bundled into the client build.
 */

import type { IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { sendMsg91Email, type ContactPayload } from "./msg91.ts";

export interface SavedLead extends ContactPayload {
  id: string;
  submittedAt: string;
}

const REQUIRED_FIELDS: (keyof ContactPayload)[] = [
  "fullName",
  "businessEmail",
  "phoneNumber",
  "companyName",
  "industry",
  "companySize",
  "biggestChallenge",
];

const LEADS_FILE = path.resolve(process.cwd(), "data", "leads.json");

// Cache recent submissions to prevent duplicate notifications from repeated requests (10s window)
const recentSubmissions = new Map<string, number>();

function saveLead(lead: SavedLead): boolean {
  try {
    const dir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const leads: SavedLead[] = fs.existsSync(LEADS_FILE)
      ? JSON.parse(fs.readFileSync(LEADS_FILE, "utf8"))
      : [];
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[contact] Failed to persist lead:", err);
    return false;
  }
}

/** Reads the full request body as a UTF-8 string. */
function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export function setCorsHeaders(req: IncomingMessage, res: ServerResponse): void {
  const origin = (req.headers.origin as string) || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Max-Age", "86400");
}

export function sendJson(res: ServerResponse, status: number, data: unknown): void {
  const body = JSON.stringify(data);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(status);
  res.end(body);
}

export async function handleContactPost(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // Set CORS headers for all environments (local & deployed)
  setCorsHeaders(req, res);

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only accept POST
  if (req.method !== "POST") {
    sendJson(res, 405, { success: false, error: "Method not allowed" });
    return;
  }

  let payload: Record<string, unknown>;
  try {
    const raw = await readBody(req);
    payload = JSON.parse(raw);
  } catch {
    sendJson(res, 400, { success: false, error: "Invalid JSON body" });
    return;
  }

  // Validate required fields
  const missing = REQUIRED_FIELDS.filter(
    (key) => !String(payload[key] ?? "").trim(),
  );
  if (missing.length > 0) {
    sendJson(res, 422, { success: false, error: "Missing required fields", fields: missing });
    return;
  }

  const contact: ContactPayload = {
    fullName: String(payload.fullName).trim(),
    businessEmail: String(payload.businessEmail).trim(),
    phoneNumber: String(payload.phoneNumber).trim(),
    companyName: String(payload.companyName).trim(),
    industry: String(payload.industry).trim(),
    companySize: String(payload.companySize).trim(),
    biggestChallenge: String(payload.biggestChallenge).trim(),
  };

  // Prevent accidental duplicate submissions within 10 seconds
  const submissionKey = `${contact.businessEmail.toLowerCase()}:${contact.phoneNumber}`;
  const now = Date.now();
  const lastTime = recentSubmissions.get(submissionKey);
  if (lastTime && now - lastTime < 10000) {
    // Return success to frontend without sending duplicate MSG91 email
    sendJson(res, 200, { success: true });
    return;
  }
  recentSubmissions.set(submissionKey, now);

  // Backend-generated submission timestamp (ISO 8601, UTC)
  const submittedAt = new Date().toISOString();

  // Save the lead first to guarantee data persistence
  const leadRecord: SavedLead = {
    id: `lead_${now}_${Math.random().toString(36).substring(2, 8)}`,
    ...contact,
    submittedAt,
  };
  saveLead(leadRecord);

  // Trigger MSG91 email notification — failure does not delete or lose the saved lead
  const emailResult = await sendMsg91Email(contact, submittedAt);
  if (!emailResult.success) {
    console.error("[contact] MSG91 notification delivery failed:", emailResult.error);
  }

  sendJson(res, 200, { success: true });
}
