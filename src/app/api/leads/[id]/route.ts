import { NextResponse } from "next/server";

import { getLeadById } from "@/lib/lead-read";

import { ensureCrmApiAuthorized, handleLeadApiError } from "../_lib";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  const unauthorizedResponse = ensureCrmApiAuthorized(request);

  if (unauthorizedResponse) {
    return unauthorizedResponse;
  }

  try {
    const { id } = await context.params;
    const lead = await getLeadById(id);

    if (!lead) {
      return NextResponse.json({ message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    return handleLeadApiError(error, "detail");
  }
}
