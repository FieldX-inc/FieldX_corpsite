#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const z = require("zod");

const ROOT = path.resolve(__dirname, "..");

function parseEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[key] = value;
  }

  return env;
}

function textResult(label, payload) {
  return {
    content: [
      {
        type: "text",
        text: `${label}\n\n${JSON.stringify(payload, null, 2)}`
      }
    ],
    structuredContent: { rows: payload }
  };
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${text}`);
  }

  return text ? JSON.parse(text) : {};
}

const env = parseEnv(path.join(ROOT, ".env.local"));
const credentialsPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ??
  path.join(ROOT, ".secrets", "fieldx-service-account.json");
const ga4PropertyId = process.env.GA4_PROPERTY_ID ?? env.GA4_PROPERTY_ID ?? "";

if (!fs.existsSync(credentialsPath)) {
  console.error(`Service account JSON not found: ${credentialsPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now
    })
  ).toString("base64url");

  const unsigned = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key).toString("base64url");
  const assertion = `${unsigned}.${signature}`;

  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion
  });

  const token = await fetchJson("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body
  });

  return token.access_token;
}

async function runGa4Report({ startDate, endDate, metrics, dimensions, limit }) {
  if (!ga4PropertyId) {
    throw new Error("GA4_PROPERTY_ID is missing. Add the numeric property ID to .env.local or Codex MCP config.");
  }

  const accessToken = await getAccessToken();
  const response = await fetchJson(
    `https://analyticsdata.googleapis.com/v1beta/properties/${ga4PropertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: dimensions.map((name) => ({ name })),
        metrics: metrics.map((name) => ({ name })),
        limit
      })
    }
  );

  const rows =
    response.rows?.map((row) => ({
      dimensions: row.dimensionValues?.map((item) => item.value) ?? [],
      metrics: row.metricValues?.map((item) => item.value) ?? []
    })) ?? [];

  return {
    propertyId: ga4PropertyId,
    dimensionHeaders: response.dimensionHeaders ?? [],
    metricHeaders: response.metricHeaders ?? [],
    rowCount: response.rowCount ?? rows.length,
    rows
  };
}

const server = new McpServer({
  name: "fieldx-ga4",
  version: "1.0.0"
});

server.registerTool(
  "ga4_configuration",
  {
    description: "Show the current GA4 MCP configuration for Field X.",
    inputSchema: {}
  },
  async () =>
    textResult("GA4 configuration", [
      {
        propertyId: ga4PropertyId || null,
        serviceAccount: serviceAccount.client_email
      }
    ])
);

server.registerTool(
  "ga4_report",
  {
    description: "Run a GA4 Data API report for the configured Field X property.",
    inputSchema: {
      startDate: z.string().default("7daysAgo"),
      endDate: z.string().default("today"),
      metrics: z.array(z.string()).min(1),
      dimensions: z.array(z.string()).default([]),
      limit: z.number().int().min(1).max(1000).default(100)
    }
  },
  async ({ startDate = "7daysAgo", endDate = "today", metrics, dimensions = [], limit = 100 }) => {
    const report = await runGa4Report({ startDate, endDate, metrics, dimensions, limit });
    return textResult("GA4 report", [report]);
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("fieldx-ga4 mcp failed", error);
  process.exit(1);
});
