import { workspacePerformanceData } from "@/lib/dashboard-data";

export async function GET() {
  return Response.json(workspacePerformanceData);
}
