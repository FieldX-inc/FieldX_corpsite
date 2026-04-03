const fs = require("fs");
const path = require("path");
const { createClient, createManagementClient } = require("microcms-js-sdk");

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

function parseArticle(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const pick = (label) => {
    const match = raw.match(new RegExp(`- ${label}:\\s*(.+)`));
    return match ? match[1].trim() : "";
  };

  const title = pick("title");
  const description = pick("description");
  const contentMatch = raw.match(/## content\n\n```html\n([\s\S]*?)\n```/);
  if (!contentMatch) {
    throw new Error("Failed to extract content HTML from article file");
  }

  return {
    title,
    description,
    content: contentMatch[1].trim(),
  };
}

async function main() {
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

  const article = parseArticle(
    path.join(process.cwd(), "briefs/2026-04-03-chintai-kanri-ai-microcms.md")
  );

  const contentClient = createClient({ serviceDomain, apiKey });
  const managementClient = createManagementClient({ serviceDomain, apiKey });

  let eyecatchUrl;
  try {
    const filePath = path.join(process.cwd(), "Frame 51.png");
    const data = new Blob([fs.readFileSync(filePath)], { type: "image/png" });
    const uploaded = await managementClient.uploadMedia({
      data,
      name: "chintai-kanri-ai-eyecatch.png",
    });
    eyecatchUrl = uploaded.url;
  } catch (error) {
    eyecatchUrl = null;
  }

  const payload = {
    title: article.title,
    content: article.content,
  };

  if (eyecatchUrl) {
    payload.eyecatch = { url: eyecatchUrl };
  }

  const created = await contentClient.create({
    endpoint,
    content: payload,
    isDraft: true,
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        endpoint,
        id: created.id,
        eyecatchUrl,
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
