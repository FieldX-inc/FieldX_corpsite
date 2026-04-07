import { NextResponse } from "next/server";

import { getLeadDailySummary } from "@/lib/lead-read";

import {
  ensureCrmApiAuthorized,
  handleLeadApiError,
  leadDailyQuerySchema,
  parseQuery
} from "../_lib";

export async function GET(request: Request) {
  const unauthorizedResponse = ensureCrmApiAuthorized(request);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const query = parseQuery(leadDailyQuerySchema, request);
    const summary = await getLeadDailySummary(query);
    return NextResponse.json({ summary });
  } catch (error) {
    return handleLeadApiError(error, "daily-summary");
  }
}
