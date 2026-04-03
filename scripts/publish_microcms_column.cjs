const fs = require("fs");
const path = require("path");
const { createClient } = require("microcms-js-sdk");

function parseEnv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const env = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1);
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

async function main() {
  const contentId = process.argv[2];
  if (!contentId) {
    throw new Error("contentId is required");
  }

  const env = parseEnv(path.join(process.cwd(), ".env.local"));
  const serviceDomain = (env.MICROCMS_SERVICE_DOMAIN || "")
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "")
    .replace(/\.microcms\.io$/i, "");
  const apiKey = env.MICROCMS_API_KEY;
  const endpoint = (env.MICROCMS_COLUMN_ENDPOINT || "column")
    .trim()
    .replace(/^\/+|\/+$/g, "");

  const client = createClient({ serviceDomain, apiKey });

  const existing = await client.get({
    endpoint,
    contentId,
  });

  const result = await client.update({
    endpoint,
    contentId,
    content: {
      title: existing.title,
      content: existing.content,
    },
    isDraft: false,
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        endpoint,
        id: result.id || contentId,
        status: "published",
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(
    JSON.stringify(
      {
        ok: false,
        message: error instanceof Error ? error.message : String(error),
      },
      null,
      2
    )
  );
  process.exit(1);
});
