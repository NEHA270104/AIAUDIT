/**
 * Netlify Serverless Function for /api/contact POST endpoint.
 *
 * Handles AI Audit Discovery Call submissions on Netlify deployments.
 * Triggers MSG91 email notifications using server-side environment variables:
 * - process.env.MSG91_AUTH_KEY
 * - process.env.MSG91_EMAIL_TEMPLATE_ID
 * - process.env.MSG91_SENDER_EMAIL
 * - process.env.MSG91_RECIPIENT_EMAIL
 * - process.env.MSG91_CC_EMAIL (optional)
 */

import { sendMsg91Email, type ContactPayload } from "../../api/msg91.ts";

const REQUIRED_FIELDS: (keyof ContactPayload)[] = [
  "fullName",
  "businessEmail",
  "phoneNumber",
  "companyName",
  "industry",
  "companySize",
  "biggestChallenge",
];

// In-memory cache for recent submissions to debounce duplicates during hot lambda invocations
const recentSubmissions = new Map<string, number>();

interface NetlifyEvent {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
  isBase64Encoded?: boolean;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
  "Content-Type": "application/json",
};

export const handler = async (event: NetlifyEvent) => {
  // Handle preflight OPTIONS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: "Method not allowed" }),
    };
  }

  let payload: Record<string, unknown>;
  try {
    const rawBody = event.isBase64Encoded && event.body
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body || "{}";
    payload = JSON.parse(rawBody);
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: "Invalid JSON body" }),
    };
  }

  // Validate required fields
  const missing = REQUIRED_FIELDS.filter(
    (key) => !String(payload[key] ?? "").trim(),
  );
  if (missing.length > 0) {
    return {
      statusCode: 422,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: "Missing required fields", fields: missing }),
    };
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

  // Prevent accidental rapid duplicate submissions (10s window)
  const submissionKey = `${contact.businessEmail.toLowerCase()}:${contact.phoneNumber}`;
  const now = Date.now();
  const lastTime = recentSubmissions.get(submissionKey);
  if (lastTime && now - lastTime < 10000) {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true }),
    };
  }
  recentSubmissions.set(submissionKey, now);

  const submittedAt = new Date().toISOString();

  // Send email via MSG91
  const emailResult = await sendMsg91Email(contact, submittedAt);
  if (!emailResult.success) {
    console.error("[netlify/contact] MSG91 notification failed:", emailResult.error);
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: true }),
  };
};
