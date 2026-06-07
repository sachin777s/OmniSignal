import type { NextRequest } from "next/server";

import { trafficSourcesData } from "@/lib/dashboard-data";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();

  if (!query) {
    return Response.json(trafficSourcesData);
  }

  const campaigns = trafficSourcesData.campaigns.filter((campaign) =>
    `${campaign.campaign} ${campaign.medium}`.toLowerCase().includes(query),
  );

  return Response.json({
    ...trafficSourcesData,
    campaigns,
  });
}
