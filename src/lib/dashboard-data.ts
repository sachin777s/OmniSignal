export type WorkspacePerformanceData = {
  metrics: Array<{
    label: string;
    value: string;
    delta: string;
    icon: "users" | "percent" | "clock" | "eye";
    chart: "area" | "conversion" | "duration" | "stacked";
  }>;
  labels: string[];
  totalEvents: number[];
  activeVisitors: number[];
  capturedEvents: number[];
  filteredEvents: number[];
  miniSeries: {
    area: number[];
    conversion: number[];
    duration: number[];
    stackedBottom: number[];
    stackedMiddle: number[];
    stackedTop: number[];
  };
};

export type TrafficSourcesData = {
  legends: Array<{ label: string; color: string }>;
  flow: {
    labels: string[];
    direct: number[];
    organic: number[];
    referral: number[];
    paid: number[];
    tooltip: {
      date: string;
      items: Array<{ label: string; value: string; color: string }>;
    };
  };
  channelTrend: string;
  channels: Array<{
    source: string;
    detail: string;
    percent: string;
    width: string;
    icon: "G" | "github" | "Y";
    iconClass: string;
  }>;
  sessionComposition: {
    totalSessions: string;
    labels: string[];
    values: number[];
  };
  campaigns: Array<{
    campaign: string;
    medium: string;
    sessions: string;
    duration: string;
    bounce: string;
    conversion: string;
    selected?: boolean;
  }>;
};

export type EngagementData = {
  scoreCards: Array<{
    label: string;
    value: string;
    meta: string;
    icon: "sparkles" | "target" | "mousePointerClick" | "clock";
    tone: string;
  }>;
  insights: Array<{
    title: string;
    detail: string;
    icon: "radio" | "messageSquare" | "shieldCheck";
    value: string;
  }>;
  legends: Array<{ label: string; color: string }>;
  qualityChart: {
    labels: string[];
    quality: number[];
    intent: number[];
    friction: number[];
  };
  featureAdoptionChart: {
    labels: string[];
    events: number[];
    accounts: number[];
  };
  journeyDepthChart: {
    labels: string[];
    values: number[];
  };
  featureRows: Array<{
    name: string;
    users: string;
    lift: string;
    width: string;
    hot?: boolean;
  }>;
  activityRows: Array<{
    title: string;
    time: string;
    tag: string;
    icon: "target" | "activity" | "checkCircle" | "shieldCheck";
  }>;
  cohorts: Array<{
    name: string;
    accounts: number;
    depth: string;
    signal: string;
    score: number;
  }>;
};

const thirtyDayLabels = Array.from({ length: 30 }, (_, index) => `MAY ${index + 1}`);

export const workspacePerformanceData: WorkspacePerformanceData = {
  metrics: [
    { label: "TOTAL EVENTS (TODAY)", value: "24.8k", delta: "+12.4%", icon: "users", chart: "area" },
    { label: "CONVERSION RATE (FUNNEL A)", value: "4.1%", delta: "+0.8%", icon: "percent", chart: "conversion" },
    { label: "AVG. SESSION DURATION", value: "4m 15s", delta: "-3.1%", icon: "clock", chart: "duration" },
    { label: "PAGE VIEWS (TODAY)", value: "88.2k", delta: "+11.1%", icon: "eye", chart: "stacked" },
  ],
  labels: thirtyDayLabels,
  totalEvents: [
    8.2, 10.8, 12.4, 15.1, 12.8, 10.6, 11.2, 12.9, 12.1, 12.5, 11.7, 10.3, 9.8,
    13.7, 20.1, 20.9, 10.4, 13.1, 19.8, 22.6, 18.6, 15.4, 12.5, 11.7, 14.6,
    13.5, 16.1, 21.0, 13.8, 10.6,
  ],
  activeVisitors: [
    5.9, 7.8, 9.1, 8.4, 9.6, 8.2, 8.7, 8.1, 7.1, 8.2, 8.5, 7.7, 7.6, 11.8,
    15.3, 14.2, 8.1, 8.4, 10.2, 14.8, 12.0, 11.2, 8.7, 8.4, 9.2, 10.6, 13.4,
    12.0, 9.6, 8.8,
  ],
  capturedEvents: [
    1.9, 2.2, 2.1, 2.8, 2.7, 1.9, 2.4, 2.5, 2.4, 2.3, 2.6, 2.5, 2.7, 3.5,
    4.8, 4.4, 2.6, 2.9, 3.7, 4.9, 3.0, 2.8, 2.4, 2.6, 2.9, 2.8, 3.2, 3.5,
    2.9, 1.8,
  ],
  filteredEvents: [
    1.1, 1.4, 1.2, 1.7, 1.4, 1.2, 1.3, 1.4, 1.3, 1.2, 1.6, 1.5, 1.6, 1.9,
    2.3, 1.9, 1.2, 1.6, 1.7, 2.0, 2.3, 2.0, 1.6, 1.7, 2.0, 1.8, 1.9, 1.9,
    1.7, 1.2,
  ],
  miniSeries: {
    area: [7, 10, 12, 10, 11, 10, 11, 10, 13, 9, 12, 17, 10, 18, 21, 14, 11, 13, 18, 9],
    conversion: [2.1, 1.5, 1.8, 2.0, 1.9, 3.4, 2.8, 2.5, 2.4, 1.7, 2.3, 2.7],
    duration: [62, 70, 58, 67, 47, 55, 56, 50, 54, 46],
    stackedBottom: [34, 29, 23, 24, 28, 23, 20, 16],
    stackedMiddle: [23, 28, 21, 21, 26, 22, 18, 15],
    stackedTop: [18, 14, 13, 11, 10, 9, 8, 7],
  },
};

export const trafficSourcesData: TrafficSourcesData = {
  legends: [
    { label: "Direct", color: "bg-teal-950 dark:bg-teal-200" },
    { label: "Organic", color: "bg-emerald-800 dark:bg-emerald-400" },
    { label: "Referral", color: "bg-emerald-600 dark:bg-emerald-300" },
    { label: "Paid Campaign", color: "bg-emerald-400 dark:bg-emerald-200" },
  ],
  flow: {
    labels: thirtyDayLabels,
    paid: [
      1.2, 1.5, 1.6, 2.2, 2.0, 1.7, 1.8, 2.1, 1.9, 2.2, 2.3, 2.1, 2.2, 3.1,
      4.6, 4.0, 2.5, 2.8, 4.9, 6.0, 5.1, 4.6, 3.5, 3.0, 3.9, 3.6, 4.6, 5.0,
      2.9, 2.6,
    ],
    referral: [
      3.8, 4.8, 5.4, 6.0, 5.5, 4.9, 5.0, 5.8, 5.2, 5.8, 5.9, 5.3, 5.0, 7.6,
      12.1, 11.8, 5.3, 5.8, 8.9, 11.2, 9.7, 8.3, 6.5, 5.7, 6.2, 7.0, 8.7, 7.4,
      6.5, 5.8,
    ],
    organic: [
      5.7, 7.2, 8.5, 8.2, 9.4, 8.1, 8.7, 8.3, 7.0, 8.0, 8.2, 7.5, 7.2, 10.8,
      13.0, 13.4, 7.4, 8.3, 11.1, 15.9, 13.1, 11.4, 8.5, 8.0, 9.3, 8.8, 11.4,
      13.7, 10.0, 8.8,
    ],
    direct: [
      8.0, 10.9, 12.2, 15.0, 12.8, 10.6, 11.2, 12.8, 12.0, 12.2, 11.6, 10.2,
      9.2, 12.7, 19.5, 21.0, 10.6, 13.1, 20.1, 23.7, 19.1, 15.4, 12.1, 11.5,
      14.5, 13.5, 15.9, 20.8, 13.5, 10.5,
    ],
    tooltip: {
      date: "May 15, 2026",
      items: [
        { label: "Paid", value: "4.2k", color: "bg-emerald-400" },
        { label: "Referral", value: "3.8k", color: "bg-emerald-600" },
        { label: "Organic", value: "12.1k", color: "bg-emerald-800" },
        { label: "Direct", value: "2.4k", color: "bg-teal-950" },
      ],
    },
  },
  channelTrend: "+9.4%",
  channels: [
    { source: "google.co.in", detail: "48.2k", percent: "45%", width: "82%", icon: "G", iconClass: "text-blue-600" },
    { source: "github.com/trending", detail: "32.1k", percent: "30%", width: "58%", icon: "github", iconClass: "text-slate-950 dark:text-white" },
    { source: "news.ycombinator.com", detail: "16.0k", percent: "15%", width: "30%", icon: "Y", iconClass: "bg-orange-600 text-white" },
  ],
  sessionComposition: {
    totalSessions: "112.4k",
    labels: ["Organic", "Direct", "Referral", "Paid"],
    values: [45, 30, 15, 10],
  },
  campaigns: [
    { campaign: "summer_launch_2026", medium: "linkedin_post", sessions: "14,204", duration: "3m 42s", bounce: "24.2%", conversion: "4.8%", selected: true },
    { campaign: "dev_outreach_q2", medium: "newsletter_email", sessions: "8,912", duration: "5m 11s", bounce: "18.5%", conversion: "6.1%", selected: true },
    { campaign: "google_search_pmax", medium: "google_cpc", sessions: "2,110", duration: "2m 50s", bounce: "41.2%", conversion: "3.4%" },
    { campaign: "partner_webinar", medium: "referral_partner", sessions: "1,854", duration: "6m 02s", bounce: "16.8%", conversion: "8.2%" },
  ],
};

export const engagementData: EngagementData = {
  scoreCards: [
    { label: "Engagement Score", value: "92", meta: "+8 pts vs last week", icon: "sparkles", tone: "text-emerald-700 dark:text-emerald-300" },
    { label: "High Intent Accounts", value: "148", meta: "31 ready for outreach", icon: "target", tone: "text-slate-700 dark:text-slate-200" },
    { label: "Feature Touches", value: "61.4k", meta: "6 core features tracked", icon: "mousePointerClick", tone: "text-emerald-700 dark:text-emerald-300" },
    { label: "Avg. Active Time", value: "7m 18s", meta: "+42s from organic users", icon: "clock", tone: "text-slate-700 dark:text-slate-200" },
  ],
  insights: [
    { title: "Signals adoption is accelerating", detail: "Campaign Signals usage rose 18% after visitors opened the funnel comparison view.", icon: "radio", value: "+18%" },
    { title: "Inbox is creating sticky sessions", detail: "Accounts using Inbox and Funnels together spend 2.4x longer in workspace reviews.", icon: "messageSquare", value: "2.4x" },
    { title: "Bot Guard reduced low-quality noise", detail: "Filtered sessions dropped below 10%, improving the conversion sample quality.", icon: "shieldCheck", value: "-12%" },
  ],
  legends: [
    { label: "Engagement Quality", color: "bg-emerald-700" },
    { label: "Buying Intent", color: "bg-emerald-300" },
    { label: "Friction Signals", color: "bg-slate-400" },
  ],
  qualityChart: {
    labels: Array.from({ length: 14 }, (_, index) => `May ${index + 17}`),
    quality: [62, 66, 64, 71, 75, 73, 78, 82, 79, 84, 87, 86, 90, 92],
    intent: [34, 37, 36, 42, 45, 44, 49, 53, 51, 57, 60, 62, 65, 68],
    friction: [28, 25, 24, 21, 19, 18, 17, 15, 16, 14, 12, 11, 10, 9],
  },
  featureAdoptionChart: {
    labels: ["Dashboards", "Funnels", "Inbox", "Signals", "Bot Guard", "Exports"],
    events: [18.6, 14.2, 11.8, 9.6, 7.2, 4.9],
    accounts: [82, 68, 57, 51, 44, 28],
  },
  journeyDepthChart: {
    labels: ["Landing", "Pricing", "Docs", "Signup", "Invite", "Activation"],
    values: [92, 76, 64, 48, 39, 31],
  },
  featureRows: [
    { name: "Funnels", users: "8.7k", lift: "+14%", width: "86%", hot: true },
    { name: "Campaign Signals", users: "7.4k", lift: "+18%", width: "78%", hot: true },
    { name: "Live Feed", users: "6.9k", lift: "+9%", width: "72%" },
    { name: "Inbox Reviews", users: "4.8k", lift: "+21%", width: "55%", hot: true },
    { name: "Bot Detection", users: "3.2k", lift: "+6%", width: "38%" },
  ],
  activityRows: [
    { title: "Acme Growth viewed Pricing after 3 funnel checks", time: "2m ago", tag: "Sales ready", icon: "target" },
    { title: "Nova Labs triggered repeated docs-search behavior", time: "11m ago", tag: "Educate", icon: "activity" },
    { title: "Brightseed exported campaign source report", time: "18m ago", tag: "Expansion", icon: "checkCircle" },
    { title: "Atlas Finance had 5 bot-filtered sessions removed", time: "26m ago", tag: "Cleaned", icon: "shieldCheck" },
  ],
  cohorts: [
    { name: "Activation explorers", accounts: 42, depth: "High", signal: "Invite + export", score: 94 },
    { name: "Evaluation teams", accounts: 67, depth: "Medium", signal: "Pricing + docs", score: 81 },
    { name: "Quiet returners", accounts: 114, depth: "Low", signal: "Dashboard glance", score: 63 },
  ],
};
