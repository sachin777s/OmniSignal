"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const tabs = [
  { label: "Performance", href: "/overview" },
  { label: "Traffic Sources", href: "/overview/traffic-sources" },
  { label: "Engagement", href: "/overview/engagement" },
];

export function OverviewTabs() {
  const pathname = usePathname();

  return (
    <div className="mt-7 flex gap-8 text-sm font-bold uppercase text-slate-500 dark:text-slate-400">
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "border-b-2 border-transparent pb-3 transition hover:text-slate-900 dark:hover:text-white",
              active &&
                "border-emerald-600 text-emerald-700 dark:text-emerald-300",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
