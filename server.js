/**
 * Production HTTP Server for BRTNeura AI Audit Landing Page.
 *
 * Runs without external dependencies using Node.js built-in modules.
 * - Serves static production assets from ./dist
 * - Implements SPA client-side routing fallback (index.html)
 * - Handles /api/contact POST endpoint with CORS and MSG91 email integration
 * - Reads environment variables from process.env (or local .env fallback)
 *
 * Usage:
 *   node server.js
 *   PORT=3000 node server.js
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env into process.env if not already set
try {
  const envPath = path.resolve(__dirname, ".env");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (key && !(key in process.env)) {
        process.env[key] = val;
      }
    }
  }
} catch {
  // Ignore env read errors in production environments where process.env is injected directly
}

// Lazy-load contact handler
let contactHandler = null;
async function getContactHandler() {
  if (!contactHandler) {
    // Dynamic import handles TypeScript stripping or ESM module resolution
    const mod = await import("./api/contact.ts");
    contactHandler = mod.handleContactPost;
  }
  return contactHandler;
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};

const DIST_DIR = path.resolve(__dirname, "dist");
const PORT = parseInt(process.env.PORT || "8443", 10);
const HOST = process.env.HOST || "0.0.0.0";

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // API Route
  if (pathname === "/api/contact") {
    try {
      const handler = await getContactHandler();
      await handler(req, res);
    } catch (err) {
      console.error("[server] /api/contact error:", err);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(500);
      res.end(JSON.stringify({ success: false, error: "Internal server error" }));
    }
    return;
  }

  // Health check endpoint for cloud platforms (AWS, Render, Railway, Fly, etc.)
  if (pathname === "/healthz" || pathname === "/health") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }));
    return;
  }

  // Only GET / HEAD for static files
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end("Method Not Allowed");
    return;
  }

  // Serve static files from dist/
  let filePath = path.join(DIST_DIR, pathname);

  // Security: prevent path traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      // Cache assets with hashed filenames
      if (pathname.startsWith("/assets/")) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback to dist/index.html
    const indexPath = path.join(DIST_DIR, "index.html");
    fs.readFile(indexPath, (indexErr, content) => {
      if (indexErr) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Application not built. Run 'pnpm build' first.");
        return;
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.writeHead(200);
      res.end(content);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.info(`[server] BRTNeura app listening on http://${HOST}:${PORT}`);
  console.info(`[server] Ready to handle production traffic and /api/contact requests.`);
});

export default server;
