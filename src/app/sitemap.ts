import type { MetadataRoute } from "next";

import { getAllPublishedRoutes } from "@/lib/content/repository";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = await getAllPublishedRoutes();
  const updatedAt = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: updatedAt,
    changeFrequency: "weekly",
    priority: route.includes("/lp/") ? 0.9 : 0.7
  }));
}
