"use client";

import { Clock3, Eye, Percent, TrendingUp, UsersRound } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { useEffect, useState } from "react";

import { WorkspacePerformanceChart } from "@/components/Charts/WorkspacePerformanceChart";
import { OverviewTabs } from "@/components/OverviewTabs";
import type { WorkspacePerformanceData } from "@/lib/dashboard-data";

type IconComponent = ComponentType<{ className?: string }>;

const metricIconMap: Record<string, IconComponent> = {
  clock: Clock3,
  eye: Eye,
  percent: Percent,
  users: UsersRound,
};

export default function Home({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [performanceData, setPerformanceData] =
    useState<WorkspacePerformanceData | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPerformanceData() {
      const response = await fetch("/api/overview/performance");
      const data = (await response.json()) as WorkspacePerformanceData;

      if (isMounted) {
        setPerformanceData(data);
      }
    }

    loadPerformanceData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mx-auto flex w-full flex-col gap-5 p-4 md:p-8">
      <div className="grid gap-4 lg:grid-cols-4">
        {(performanceData?.metrics ?? []).map((metric) => {
          const MetricIcon = metricIconMap[metric.icon];

          return (
            <article
              key={metric.label}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <MetricIcon className="size-5" />
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
                <WorkspacePerformanceChart
                  data={performanceData}
                  variant={metric.chart}
                />
              </div>
            </article>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="px-5 pt-5">
          <h1 className="text-sm font-black uppercase tracking-normal text-slate-950 dark:text-white">
            Workspace Activity Performance
          </h1>
          <OverviewTabs />
        </div>

        {children}
      </div>
    </section>
  );
}
