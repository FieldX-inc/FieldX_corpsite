import { NextResponse } from "next/server";
import { z } from "zod";

import { isCrmApiAuthorized } from "@/lib/lead-api-auth";

const inquiryTypeSchema = z.enum(["project", "partnership", "media", "other"]);
const leadStatusSchema = z.enum(["new", "contacted", "qualified", "lost"]);
const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const leadListQuerySchema = z.object({
  status: leadStatusSchema.optional(),
  inquiryType: inquiryTypeSchema.optional(),
  utmCampaign: z.string().trim().max(120).optional(),
  pagePath: z.string().trim().max(300).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional()
});

export const leadSummaryQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional()
});

export const leadDailyQuerySchema = z.object({
  from: isoDateSchema.optional(),
  to: isoDateSchema.optional(),
  limit: z.coerce.number().int().min(1).max(365).optional()
});

export function ensureCrmApiAuthorized(request: Request) {
  if (isCrmApiAuthorized(request)) {
    return null;
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function parseQuery<T extends z.ZodTypeAny>(schema: T, request: Request): z.infer<T> {
  const url = new URL(request.url);
  return schema.parse(Object.fromEntries(url.searchParams.entries()));
}

export function handleLeadApiError(error: unknown, context: string) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ message: "Invalid query parameters." }, { status: 400 });
  }

  console.error(`lead api failed: ${context}`, {
    message: error instanceof Error ? error.message : String(error)
  });

  return NextResponse.json({ message: "Internal server error." }, { status: 500 });
}
