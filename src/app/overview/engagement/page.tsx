import {
  Activity,
  Bell,
  CheckCircle2,
  Clock3,
  Flame,
  MessageSquare,
  MousePointerClick,
  Radio,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  Zap,
} from "lucide-react";

import {
  EngagementQualityChart,
  FeatureAdoptionChart,
  JourneyDepthChart,
} from "@/components/Charts/EngagementCharts";
import { Button } from "@/components/ui/button";

const scoreCards = [
  {
    label: "Engagement Score",
    value: "92",
    meta: "+8 pts vs last week",
    icon: Sparkles,
    tone: "text-emerald-700 dark:text-emerald-300",
  },
  {
    label: "High Intent Accounts",
    value: "148",
    meta: "31 ready for outreach",
    icon: Target,
    tone: "text-slate-700 dark:text-slate-200",
  },
  {
    label: "Feature Touches",
    value: "61.4k",
    meta: "6 core features tracked",
    icon: MousePointerClick,
    tone: "text-emerald-700 dark:text-emerald-300",
  },
  {
    label: "Avg. Active Time",
    value: "7m 18s",
    meta: "+42s from organic users",
    icon: Clock3,
    tone: "text-slate-700 dark:text-slate-200",
  },
];

const insights = [
  {
    title: "Signals adoption is accelerating",
    detail: "Campaign Signals usage rose 18% after visitors opened the funnel comparison view.",
    icon: Radio,
    value: "+18%",
  },
  {
    title: "Inbox is creating sticky sessions",
    detail: "Accounts using Inbox and Funnels together spend 2.4x longer in workspace reviews.",
    icon: MessageSquare,
    value: "2.4x",
  },
  {
    title: "Bot Guard reduced low-quality noise",
    detail: "Filtered sessions dropped below 10%, improving the conversion sample quality.",
    icon: ShieldCheck,
    value: "-12%",
  },
];

const featureRows = [
  { name: "Funnels", users: "8.7k", lift: "+14%", width: "86%", hot: true },
  {
    name: "Campaign Signals",
    users: "7.4k",
    lift: "+18%",
    width: "78%",
    hot: true,
  },
  { name: "Live Feed", users: "6.9k", lift: "+9%", width: "72%" },
  { name: "Inbox Reviews", users: "4.8k", lift: "+21%", width: "55%", hot: true },
  { name: "Bot Detection", users: "3.2k", lift: "+6%", width: "38%" },
];

const activityRows = [
  {
    title: "Acme Growth viewed Pricing after 3 funnel checks",
    time: "2m ago",
    tag: "Sales ready",
    icon: Target,
  },
  {
    title: "Nova Labs triggered repeated docs-search behavior",
    time: "11m ago",
    tag: "Educate",
    icon: Activity,
  },
  {
    title: "Brightseed exported campaign source report",
    time: "18m ago",
    tag: "Expansion",
    icon: CheckCircle2,
  },
  {
    title: "Atlas Finance had 5 bot-filtered sessions removed",
    time: "26m ago",
    tag: "Cleaned",
    icon: ShieldCheck,
  },
];

const cohorts = [
  {
    name: "Activation explorers",
    accounts: 42,
    depth: "High",
    signal: "Invite + export",
    score: 94,
  },
  {
    name: "Evaluation teams",
    accounts: 67,
    depth: "Medium",
    signal: "Pricing + docs",
    score: 81,
  },
  {
    name: "Quiet returners",
    accounts: 114,
    depth: "Low",
    signal: "Dashboard glance",
    score: 63,
  },
];

const legends = [
  { label: "Engagement Quality", color: "bg-emerald-700" },
  { label: "Buying Intent", color: "bg-emerald-300" },
  { label: "Friction Signals", color: "bg-slate-400" },
];

export default function Page() {
  return (
    <div className="border-t border-slate-200 bg-slate-50/35 px-4 pb-5 pt-4 dark:border-slate-800 dark:bg-slate-950/30 md:px-5">
      <div className="grid gap-4 xl:grid-cols-4">
        {scoreCards.map((card) => (
          <article
            key={card.label}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <card.icon className="size-5" />
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-black uppercase text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                Live
              </span>
            </div>
            <p className="mt-4 text-xs font-black uppercase text-slate-500 dark:text-slate-400">
              {card.label}
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className={`text-3xl font-black tracking-normal ${card.tone}`}>
                {card.value}
              </p>
              <p className="text-right text-xs font-bold text-slate-500 dark:text-slate-400">
                {card.meta}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {insights.map((insight) => (
          <article
            key={insight.title}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/20">
                <insight.icon className="size-5" />
              </span>
              <span className="text-2xl font-black text-slate-950 dark:text-white">
                {insight.value}
              </span>
            </div>
            <h3 className="mt-4 text-sm font-black uppercase text-slate-950 dark:text-white">
              {insight.title}
            </h3>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">
              {insight.detail}
            </p>
          </article>
        ))}
      </div>

      <section className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="flex flex-col gap-3 px-4 pt-4 md:flex-row md:items-center md:justify-between md:px-5">
          <div>
            <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
              Engagement Quality Over Time
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              Quality blends active time, repeat visits, feature depth, and clean activity signals.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legends.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-slate-100"
              >
                <span className={`h-1.5 w-5 rounded-full ${item.color}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
        <div className="relative h-[320px] px-3 pb-3 pt-4 md:px-5">
          <EngagementQualityChart />
          <div className="pointer-events-none absolute right-6 top-8 hidden rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900 shadow-sm lg:block dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200">
            <span className="mb-1 flex items-center gap-1 text-[11px] font-black uppercase">
              <Zap className="size-3" />
              Intent spike
            </span>
            31 accounts crossed outreach threshold.
          </div>
        </div>
      </section>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
                Feature Adoption Momentum
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Events and account reach by product area.
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-9 gap-2 font-black">
              <Bell className="size-4" />
              Alert Rules
            </Button>
          </div>
          <div className="mt-4 h-72">
            <FeatureAdoptionChart />
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
            Journey Depth Funnel
          </h2>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Share of engaged visitors reaching each product milestone.
          </p>
          <div className="mt-4 h-72">
            <JourneyDepthChart />
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
              Features Creating Lift
            </h2>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <TrendingUp className="size-3" />
              Ranked by usage lift
            </span>
          </div>
          <div className="mt-5 space-y-4">
            {featureRows.map((feature) => (
              <div key={feature.name} className="grid grid-cols-[1fr_auto] gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="truncate text-sm font-black text-slate-950 dark:text-white">
                      {feature.name}
                    </p>
                    {feature.hot ? (
                      <Flame className="size-4 text-emerald-600 dark:text-emerald-300" />
                    ) : null}
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-700 dark:bg-emerald-400"
                      style={{ width: feature.width }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-950 dark:text-white">
                    {feature.users}
                  </p>
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {feature.lift}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
          <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
            High-Value Activity Feed
          </h2>
          <div className="mt-5 space-y-3">
            {activityRows.map((activity) => (
              <div
                key={activity.title}
                className="grid grid-cols-[2.25rem_1fr_auto] items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <span className="grid size-9 place-items-center rounded-lg bg-white text-emerald-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-emerald-300 dark:ring-slate-800">
                  <activity.icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-950 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {activity.time}
                  </p>
                </div>
                <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black uppercase text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-800">
                  {activity.tag}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
        <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-5">
          <div>
            <h2 className="text-sm font-black uppercase text-slate-950 dark:text-white">
              Engagement Cohorts
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              Account groups Omnisignal can route into sales, nurture, or cleanup workflows.
            </p>
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2 font-black">
            <UsersRound className="size-4" />
            Build Segment
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-y border-slate-200 bg-slate-50 text-left text-xs font-black uppercase text-slate-950 dark:border-slate-800 dark:bg-slate-950/60 dark:text-white">
                <th className="px-5 py-2">Cohort</th>
                <th className="px-5 py-2 text-right">Accounts</th>
                <th className="px-5 py-2">Depth</th>
                <th className="px-5 py-2">Dominant Signal</th>
                <th className="px-5 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((cohort) => (
                <tr
                  key={cohort.name}
                  className="border-b border-slate-200 font-bold text-slate-950 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800/50"
                >
                  <td className="px-5 py-3">{cohort.name}</td>
                  <td className="px-5 py-3 text-right">{cohort.accounts}</td>
                  <td className="px-5 py-3">{cohort.depth}</td>
                  <td className="px-5 py-3">{cohort.signal}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                      {cohort.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
