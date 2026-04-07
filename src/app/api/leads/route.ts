import { NextResponse } from "next/server";

import { getLeads } from "@/lib/lead-read";

import { ensureCrmApiAuthorized, handleLeadApiError, parseQuery, leadListQuerySchema } from "./_lib";

export async function GET(request: Request) {
  const unauthorizedResponse = ensureCrmApiAuthorized(request);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const query = parseQuery(leadListQuerySchema, request);
    const leads = await getLeads(query);
    return NextResponse.json({ leads });
  } catch (error) {
    return handleLeadApiError(error, "list");
  }
}
