const PLACEHOLDER_HOSTS = new Set(["example.com", "www.example.com"]);
const DEFAULT_SITE_URL = "https://www.fieldx.site";

export function getSiteUrl(): string {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

  let parsedSiteUrl: URL;

  try {
    parsedSiteUrl = new URL(rawSiteUrl);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be a valid absolute URL. Received: "${rawSiteUrl}".`
    );
  }

  if (PLACEHOLDER_HOSTS.has(parsedSiteUrl.hostname)) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must not use a placeholder domain. Received: "${rawSiteUrl}".`
    );
  }

  return parsedSiteUrl.origin;
}
