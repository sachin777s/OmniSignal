import { Clock3, Eye, Percent, TrendingUp, UsersRound } from "lucide-react";

import { WorkspacePerformanceChart } from "@/components/Charts/WorkspacePerformanceChart";

const metrics = [
  {
    label: "TOTAL EVENTS (TODAY)",
    value: "24.8k",
    delta: "+12.4%",
    icon: UsersRound,
    chart: "area",
  },
  {
    label: "CONVERSION RATE (FUNNEL A)",
    value: "4.1%",
    delta: "+0.8%",
    icon: Percent,
    chart: "conversion",
  },
  {
    label: "AVG. SESSION DURATION",
    value: "4m 15s",
    delta: "-3.1%",
    icon: Clock3,
    chart: "duration",
  },
  {
    label: "PAGE VIEWS (TODAY)",
    value: "88.2k",
    delta: "+11.1%",
    icon: Eye,
    chart: "stacked",
  },
] as const;

export default function Home() {
  return (
    <section className="mx-auto flex w-full flex-col gap-5 p-4 md:p-8">
      <div className="grid gap-4 lg:grid-cols-4">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <metric.icon className="size-5" />
              </span>
              <h2 className="text-xs font-black uppercase text-slate-950 dark:text-white">
                {metric.label}
              </h2>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="text-3xl font-black tracking-normal text-slate-950 dark:text-white">
                {metric.value}
              </p>
              <p
                className={
                  metric.delta.startsWith("+")
                    ? "flex items-center gap-1 text-sm font-bold text-emerald-700 dark:text-emerald-300"
                    : "flex items-center gap-1 text-sm font-bold text-slate-500 dark:text-slate-400"
                }
              >
                {metric.delta}
                {metric.delta.startsWith("+") ? (
                  <TrendingUp className="size-3" />
                ) : null}
              </p>
            </div>

            <div className="mt-5 h-16 border-t border-slate-200 pt-3 dark:border-slate-800">
              <WorkspacePerformanceChart variant={metric.chart} />
            </div>
          </article>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="px-5 pt-5">
          <h1 className="text-sm font-black uppercase tracking-normal text-slate-950 dark:text-white">
            Workspace Activity Performance
          </h1>
          <div className="mt-7 flex gap-8 text-sm font-bold uppercase text-slate-500 dark:text-slate-400">
            <button className="border-b-2 border-emerald-600 pb-3 text-emerald-700 dark:text-emerald-300">
              Performance
            </button>
            <button className="pb-3 transition hover:text-slate-900 dark:hover:text-white">
              Traffic Sources
            </button>
            <button className="pb-3 transition hover:text-slate-900 dark:hover:text-white">
              Engagement
            </button>
          </div>
        </div>

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
      </div>
    </section>
  );
}
