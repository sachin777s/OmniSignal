"use client";
import { Download, Filter, TrendingUp, GitMergeIcon } from "lucide-react";

import {
  SessionCompositionChart,
  TrafficFlowChart,
} from "@/components/Charts/TrafficSourcesCharts";
import { Button } from "@/components/ui/button";
import type { TrafficSourcesData } from "@/lib/dashboard-data";
import { useEffect, useState } from "react";

export default function Page() {
  const [trafficData, setTrafficData] = useState<TrafficSourcesData | null>(null);
  const [filterInput, setFilterInput] = useState<string>("");
  const [debouncedFilter, setDebouncedFilter] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilter(filterInput.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(timeout);
  }, [filterInput]);

  useEffect(() => {
    let isMounted = true;

    async function loadTrafficData() {
      const params = new URLSearchParams();

      if (debouncedFilter) {
        params.set("q", debouncedFilter);
      }

      const query = params.toString();
      const response = await fetch(
        `/api/overview/traffic-sources${query ? `?${query}` : ""}`,
      );
      const data = (await response.json()) as TrafficSourcesData;

      if (isMounted) {
        setTrafficData(data);
      }
    }

    loadTrafficData();

    return () => {
      isMounted = false;
    };
  }, [debouncedFilter]);

  const campaignRows = trafficData?.campaigns ?? [];

  return (
    <div className="border-t border-slate-200 bg-slate-50/35 px-4 pb-5 pt-4 dark:border-slate-800 dark:bg-slate-950/30 md:px-5">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="flex flex-col gap-3 px-4 pt-4 md:flex-row md:items-center md:justify-between md:px-5">
          <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
            Traffic Flow Over Time
          </h2>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {(trafficData?.legends ?? []).map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-slate-100"
              >
                <span className={`size-3 rounded-full ${item.color}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-[300px] px-3 pb-3 pt-2 md:h-[320px] md:px-5">
          {trafficData ? (
            <TrafficFlowChart data={trafficData.flow} />
          ) : (
            <div className="h-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-950" />
          )}
          <div className="pointer-events-none absolute bottom-[52px] left-[51%] top-8 hidden border-l-2 border-dashed border-cyan-400/80 lg:block" />
          <div className="pointer-events-none absolute left-[51%] top-[91px] hidden -translate-x-1/2 lg:block">
            <span className="absolute -left-1.5 top-0 size-3 rounded-full border-2 border-white bg-emerald-500 ring-2 ring-cyan-400" />
            <span className="absolute -left-1.5 top-[72px] size-3 rounded-full border-2 border-white bg-emerald-700 ring-2 ring-cyan-400" />
            <span className="absolute -left-1.5 top-[148px] size-3 rounded-full border-2 border-white bg-emerald-400 ring-2 ring-cyan-400" />
          </div>
          <div className="pointer-events-none absolute left-[52.5%] top-[92px] hidden w-32 rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-bold text-slate-950 shadow-xl shadow-slate-900/10 lg:block z-10">
            <p className="mb-1 text-[11px] font-black">
              {trafficData?.flow.tooltip.date}
            </p>
            {(trafficData?.flow.tooltip.items ?? []).map((item) => (
              <p key={item.label} className="flex justify-between gap-2">
                <span className="flex items-center gap-1">
                  <span className={`size-2 rounded-full ${item.color}`} />
                  {item.label}:
                </span>
                {item.value}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
              Channels Leaderboard
            </h2>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <TrendingUp className="size-3" />
              {trafficData?.channelTrend ?? "--"}
            </span>
          </div>
          <div className="mt-5 space-y-4">
            {(trafficData?.channels ?? []).map((row) => (
              <div key={row.source} className="grid grid-cols-[1.5rem_1fr_3rem] items-center gap-3">
                <span
                  className={`grid size-6 place-items-center rounded text-sm font-black ${row.iconClass}`}
                >
                  {row.icon === "github" ? <GitMergeIcon className="size-6" /> : row.icon}
                </span>
                <div className="min-w-0">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-black text-slate-950 dark:text-white">
                      {row.source} - {row.detail}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-700 shadow-[0_0_0_1px_rgba(4,120,87,0.15)] dark:bg-emerald-400"
                      style={{ width: row.width }}
                    />
                  </div>
                </div>
                <p className="text-right text-sm font-black text-slate-950 dark:text-white">
                  ({row.percent})
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
            Session Composition Ratio
          </h2>
          <div className="mt-1 grid min-h-36 items-center gap-4">
            <div className="relative mx-auto h-44 w-full max-w-80">
              {trafficData ? (
                <SessionCompositionChart data={trafficData.sessionComposition} />
              ) : (
                <div className="h-full animate-pulse rounded-full bg-slate-100 dark:bg-slate-950" />
              )}
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center z-0">
                <div>
                  <p className="text-2xl font-black text-slate-950 dark:text-white">
                    {trafficData?.sessionComposition.totalSessions ?? "--"}
                  </p>
                  <p className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-300">
                    Total Sessions
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-black text-slate-950 dark:text-white">
              {(trafficData?.sessionComposition.labels ?? []).map((label, index) => (
                <span key={label} className="flex items-center gap-2">
                  <span
                    className={[
                      "size-2.5 rounded-full",
                      index === 0 ? "bg-teal-950 dark:bg-teal-200" : "",
                      index === 1 ? "bg-emerald-800 dark:bg-emerald-400" : "",
                      index === 2 ? "bg-emerald-600 dark:bg-emerald-200" : "",
                      index === 3 ? "bg-emerald-400 dark:bg-emerald-200" : "",
                    ].join(" ")}
                  />
                  {label}: {trafficData?.sessionComposition.values[index]}%
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-5">
          <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
            Granular UTM Campaign Data Matrix
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
              <input
                className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-slate-300 focus:ring-3 focus:ring-slate-200/80 md:w-56 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-700/50"
                placeholder="Filter campaigns..."
                type="search"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
              />
            </label>
            <Button variant="outline" size="sm" className="h-9 gap-2 font-black">
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-slate-200 bg-slate-50 text-left text-xs font-black uppercase text-slate-950 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white">
                <th className="px-5 py-2">Campaign</th>
                <th className="px-5 py-2">Source / Medium</th>
                <th className="px-5 py-2 text-right">Sessions</th>
                <th className="px-5 py-2 text-right">Avg. Duration</th>
                <th className="px-5 py-2 text-right">Bounce Rate</th>
                <th className="px-5 py-2 text-right">Goal Conv.</th>
              </tr>
            </thead>
            <tbody>
              {campaignRows.map((row) => (
                <tr
                  key={row.campaign}
                  className={
                    row.selected
                      ? "border-b border-slate-200 bg-slate-300/55 font-bold text-slate-950 dark:border-slate-800 dark:bg-slate-800/80 dark:text-white"
                      : "border-b border-slate-200 font-bold text-slate-950 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800/50"
                  }
                >
                  <td className="px-5 py-2">{row.campaign}</td>
                  <td className="px-5 py-2">{row.medium}</td>
                  <td className="px-5 py-2 text-right">{row.sessions}</td>
                  <td className="px-5 py-2 text-right">{row.duration}</td>
                  <td className="px-5 py-2 text-right">{row.bounce}</td>
                  <td className="px-5 py-2 text-right">{row.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
