import { WorkspacePerformanceChart } from "@/components/Charts/WorkspacePerformanceChart";
import React from "react";

export default function page() {
  return (
    <div className="border-t border-slate-200 px-5 pb-5 pt-5 dark:border-slate-800">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold uppercase text-slate-950 dark:text-white">
          Last 30 Days
        </p>
        <div className="flex flex-wrap items-center gap-5 text-sm font-bold uppercase text-slate-950 dark:text-slate-100">
          <span className="flex items-center gap-2">
            <span className="h-1 w-4 rounded-full bg-emerald-700" />
            Total Events (24hr Avg)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-4 rounded-full bg-emerald-300" />
            Active Visitors
          </span>
        </div>
      </div>

      <div className="relative h-[340px] min-h-[340px]">
        <WorkspacePerformanceChart />
        <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-black uppercase text-slate-950 dark:text-white">
          Last 30 Days
        </p>
      </div>
    </div>
  );
}
