import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  ChevronRight,
  Gauge,
  Globe2,
  Inbox,
  LayoutDashboard,
  LineChart,
  MousePointerClick,
  Radio,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primaryItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Live Feed", icon: Radio },
  { label: "Analytics", icon: BarChart3 },
  { label: "Funnels", icon: LineChart },
  { label: "Visitors", icon: Users },
  { label: "Clients", icon: Building2 },
];

const secondaryItems = [
  { label: "Campaign Signals", icon: Activity },
  { label: "Bot Detection", icon: Bot },
  { label: "Inbox", icon: Inbox },
  { label: "Security", icon: ShieldCheck },
];

export const Sidebar = () => {
  return (
    <aside className="fixed bottom-0 left-0 top-16 z-40 w-20 border-r border-slate-200/80 bg-white shadow-sm shadow-slate-900/5 md:w-72 dark:border-slate-800/80 dark:bg-slate-950 dark:shadow-black/20">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4 md:px-4">
        <div className="hidden rounded-lg border border-slate-200 bg-slate-50 p-3 md:block dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-slate-500 dark:text-slate-400">
                Workspace
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
                Acme Growth
              </p>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Switch workspace">
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-md bg-white px-2.5 py-2 text-xs font-medium text-slate-600 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800">
            <Globe2 className="size-4 text-emerald-600" />
            acme.com tracking live
          </div>
        </div>

        <nav className="mt-1 flex flex-col gap-1 md:mt-5" aria-label="Primary">
          {primaryItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={cn(
                "group flex h-11 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 md:justify-start md:gap-3 md:px-3 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white",
                item.active &&
                  "bg-slate-950 text-white shadow-md shadow-slate-900/15 hover:bg-slate-900 hover:text-white dark:bg-white dark:text-slate-950 dark:shadow-black/30 dark:hover:bg-slate-200 dark:hover:text-slate-950",
              )}
            >
              <item.icon className="size-5 shrink-0" />
              <span className="hidden text-sm font-medium md:inline">
                {item.label}
              </span>
              {item.active ? (
                <span className="ml-auto hidden rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold md:inline">
                  Now
                </span>
              ) : null}
            </a>
          ))}
        </nav>

        <div className="my-4 h-px bg-slate-200 dark:bg-slate-800" />

        <nav className="flex flex-col gap-1" aria-label="Signals">
          {secondaryItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="group flex h-11 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 md:justify-start md:gap-3 md:px-3 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <item.icon className="size-5 shrink-0" />
              <span className="hidden text-sm font-medium md:inline">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-auto hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:block dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <MousePointerClick className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-white">
                24.8k events
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                captured today
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-3/4 rounded-full bg-emerald-500" />
          </div>
        </div>

        <a
          href="#"
          className="mt-4 flex h-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition hover:bg-slate-200 md:hidden dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Performance"
        >
          <Gauge className="size-5" />
        </a>
      </div>
    </aside>
  );
};
