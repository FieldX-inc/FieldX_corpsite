import { createClient } from "microcms-js-sdk";

const DEFAULT_COLUMN_ENDPOINT = "column";

function getRequiredEnv(name: "MICROCMS_SERVICE_DOMAIN" | "MICROCMS_API_KEY"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`[microCMS] Missing required environment variable: ${name}`);
  }

  return value;
}

function normalizeServiceDomain(rawValue: string): string {
  const normalized = rawValue
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "")
    .replace(/\.microcms\.io$/i, "");

  if (!normalized) {
    throw new Error("[microCMS] MICROCMS_SERVICE_DOMAIN is empty after normalization");
  }

  return normalized;
}

export function getMicrocmsColumnEndpoint(): string {
  return (process.env.MICROCMS_COLUMN_ENDPOINT ?? DEFAULT_COLUMN_ENDPOINT).trim().replace(/^\/+|\/+$/g, "");
}

export function getMicrocmsClient() {
  return createClient({
    serviceDomain: normalizeServiceDomain(getRequiredEnv("MICROCMS_SERVICE_DOMAIN")),
    apiKey: getRequiredEnv("MICROCMS_API_KEY")
  });
}
