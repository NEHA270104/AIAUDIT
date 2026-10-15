/**
 * MSG91 email notification handler for the AI Audit Discovery Call form.
 *
 * Called by the Vite server middleware registered in vite.config.ts.
 * Reads environment variables at request time (never from import.meta.env,
 * which would expose secrets to the browser bundle).
 */

import fs from "node:fs";
import path from "node:path";

export interface ContactPayload {
  fullName: string;
  businessEmail: string;
  phoneNumber: string;
  companyName: string;
  industry: string;
  companySize: string;
  biggestChallenge: string;
}

interface Msg91Response {
  type?: string;
  message?: string;
}

function getEnv(key: string, defaultValue = ""): string {
  if (process.env[key]) return process.env[key]!;
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      const match = content.match(new RegExp(`^${key}=(.*)$`, "m"));
      if (match) {
        const val = match[1].trim();
        process.env[key] = val;
        return val;
      }
    }
  } catch {}
  return defaultValue;
}

/**
 * Sends an email notification via the MSG91 v5 email API using the
 * configured template. All eight template variables required by the
 * ai_audit_contact_form template are populated.
 *
 * Returns { success: true } on success.
 * Returns { success: false, error: string } on failure.
 * Never throws — caller decides how to surface errors.
 */
export async function sendMsg91Email(
  payload: ContactPayload,
  submittedAt: string,
): Promise<{ success: boolean; error?: string }> {
  const authKey = getEnv("MSG91_AUTH_KEY");
  const templateId = getEnv("MSG91_EMAIL_TEMPLATE_ID", "ai_audit_contact_form");
  const senderEmail = getEnv("MSG91_SENDER_EMAIL");
  const recipientEmail = getEnv("MSG91_RECIPIENT_EMAIL", "snehal.parte@brtneura.in");
  const ccEmail = getEnv("MSG91_CC_EMAIL", "neha.chavan@brtneura.in");

  if (!authKey) {
    console.error("[MSG91] MSG91_AUTH_KEY is not set. Email notification skipped.");
    return { success: false, error: "MSG91_AUTH_KEY not configured" };
  }

  if (!senderEmail) {
    console.error("[MSG91] MSG91_SENDER_EMAIL is not set. Email notification skipped.");
    return { success: false, error: "MSG91_SENDER_EMAIL not configured" };
  }

  const senderDomain = senderEmail.split("@")[1] ?? "";

  const variables = {
    fullName: payload.fullName || "",
    businessEmail: payload.businessEmail || "",
    phoneNumber: payload.phoneNumber || "",
    companyName: payload.companyName || "",
    industry: payload.industry || "",
    companySize: payload.companySize || "",
    biggestChallenge: payload.biggestChallenge || "",
    submittedAt,
  };

  const toList = recipientEmail
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
    .map((email) => ({ email, name: email.split("@")[0] }));

  const ccList = ccEmail
    ? ccEmail
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)
        .map((email) => ({ email, name: email.split("@")[0] }))
    : [];

  const recipientBlock: {
    to: Array<{ email: string; name: string }>;
    cc?: Array<{ email: string; name: string }>;
    variables: typeof variables;
  } = {
    to: toList,
    variables,
  };

  if (ccList.length > 0) {
    recipientBlock.cc = ccList;
  }

  // Log the full payload (no auth key) so every submission is traceable in the terminal.
  console.info("[MSG91] Sending email notification:");
  console.info("  template_id :", templateId);
  console.info("  recipient(s):", toList.map((t) => t.email).join(", "));
  if (ccList.length > 0) {
    console.info("  cc          :", ccList.map((c) => c.email).join(", "));
  }
  console.info("  from        :", senderEmail);
  console.info("  variables   :", JSON.stringify(variables, null, 4));

  const body = JSON.stringify({
    recipients: [recipientBlock],
    from: { name: "BRTNeura AI Audit", email: senderEmail },
    domain: senderDomain,
    template_id: templateId,
  });

  try {
    const response = await fetch("https://control.msg91.com/api/v5/email/send", {
      method: "POST",
      headers: {
        authkey: authKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body,
    });

    const json: Msg91Response = await response.json().catch(() => ({}));

    if (!response.ok || json?.type === "error") {
      const errMsg = json?.message ?? `HTTP ${response.status}`;
      console.error("[MSG91] Email delivery failed:", errMsg);
      return { success: false, error: errMsg };
    }

    console.info("[MSG91] Email notification sent successfully.");
    return { success: true };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[MSG91] Email request threw an exception:", errMsg);
    return { success: false, error: errMsg };
  }
}
