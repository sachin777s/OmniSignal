import { engagementData } from "@/lib/dashboard-data";

export async function GET() {
  return Response.json(engagementData);
}
