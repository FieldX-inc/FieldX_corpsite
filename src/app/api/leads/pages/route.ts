import { NextResponse } from "next/server";

import { getLeadPageSummary } from "@/lib/lead-read";

import { ensureCrmApiAuthorized, handleLeadApiError, leadSummaryQuerySchema, parseQuery } from "../_lib";

export async function GET(request: Request) {
  const unauthorizedResponse = ensureCrmApiAuthorized(request);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const { limit } = parseQuery(leadSummaryQuerySchema, request);
    const summary = await getLeadPageSummary(limit);
    return NextResponse.json({ summary });
  } catch (error) {
    return handleLeadApiError(error, "page-summary");
  }
}
