"use client";

import {
  Chart,
  type ChartConfiguration,
  type ChartDataset,
  type ChartOptions,
  registerables,
} from "chart.js";
import { useEffect, useRef } from "react";

Chart.register(...registerables);

const dayLabels = Array.from({ length: 14 }, (_, index) => `May ${index + 17}`);

const quality = [62, 66, 64, 71, 75, 73, 78, 82, 79, 84, 87, 86, 90, 92];
const intent = [34, 37, 36, 42, 45, 44, 49, 53, 51, 57, 60, 62, 65, 68];
const friction = [28, 25, 24, 21, 19, 18, 17, 15, 16, 14, 12, 11, 10, 9];

const featureLabels = ["Dashboards", "Funnels", "Inbox", "Signals", "Bot Guard", "Exports"];
const featureEvents = [18.6, 14.2, 11.8, 9.6, 7.2, 4.9];
const featureAccounts = [82, 68, 57, 51, 44, 28];

const journeyLabels = ["Landing", "Pricing", "Docs", "Signup", "Invite", "Activation"];
const journeyValues = [92, 76, 64, 48, 39, 31];

type EngagementChartKind = "quality" | "features" | "journey";

export function EngagementQualityChart() {
  return <EngagementChart kind="quality" />;
}

export function FeatureAdoptionChart() {
  return <EngagementChart kind="features" />;
}

export function JourneyDepthChart() {
  return <EngagementChart kind="journey" />;
}

function EngagementChart({ kind }: { kind: EngagementChartKind }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const chart = new Chart(canvasRef.current, getChartConfig(kind));

    return () => {
      chart.destroy();
    };
  }, [kind]);

  return <canvas ref={canvasRef} />;
}

function getChartConfig(kind: EngagementChartKind): ChartConfiguration {
  if (kind === "features") {
    return {
      type: "bar",
      data: {
        labels: featureLabels,
        datasets: [
          barDataset("Feature Events", featureEvents, "#047857", "events"),
          barDataset("Accounts Reached", featureAccounts, "#99f6c8", "accounts"),
        ],
      },
      options: featureOptions,
    };
  }

  if (kind === "journey") {
    return {
      type: "bar",
      data: {
        labels: journeyLabels,
        datasets: [
          {
            label: "Users",
            data: journeyValues,
            backgroundColor: [
              "#064e45",
              "#047857",
              "#168965",
              "#34a883",
              "#6ee7b7",
              "#cbd5e1",
            ],
            borderRadius: 6,
            barPercentage: 0.72,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: journeyOptions,
    };
  }

  return {
    type: "line",
    data: {
      labels: dayLabels,
      datasets: [
        lineDataset("Engagement Quality", quality, "#047857", "rgba(4, 120, 87, 0.16)"),
        lineDataset("Buying Intent", intent, "#66c99b", "rgba(102, 201, 155, 0.18)"),
        lineDataset("Friction Signals", friction, "#94a3b8", "rgba(148, 163, 184, 0.12)"),
      ],
    },
    options: qualityOptions,
  };
}

function lineDataset(
  label: string,
  data: number[],
  borderColor: string,
  backgroundColor: string,
): ChartDataset<"line"> {
  return {
    label,
    data,
    backgroundColor,
    borderColor,
    borderWidth: label === "Engagement Quality" ? 3 : 2,
    fill: true,
    pointBackgroundColor: borderColor,
    pointBorderColor: "#ffffff",
    pointHoverRadius: 5,
    pointRadius: 0,
    tension: 0.36,
  };
}

function barDataset(
  label: string,
  data: number[],
  backgroundColor: string,
  xAxisID: string,
): ChartDataset<"bar"> {
  return {
    label,
    data,
    backgroundColor,
    borderRadius: 5,
    barPercentage: 0.62,
    categoryPercentage: 0.7,
    xAxisID,
  };
}

const baseGrid = {
  color: "#e2e8f0",
};

const qualityOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      borderWidth: 1,
      bodyColor: "#0f172a",
      displayColors: true,
      padding: 10,
      titleColor: "#020617",
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#0f172a",
        font: {
          size: 11,
          weight: 700,
        },
        maxRotation: 0,
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      border: {
        display: false,
      },
      grid: baseGrid,
      ticks: {
        color: "#0f172a",
        font: {
          size: 11,
          weight: 700,
        },
        stepSize: 20,
        callback(value) {
          return `${value}`;
        },
      },
    },
  },
};

const featureOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      borderWidth: 1,
      bodyColor: "#0f172a",
      displayColors: true,
      padding: 10,
      titleColor: "#020617",
    },
  },
  scales: {
    events: {
      beginAtZero: true,
      max: 20,
      border: {
        display: false,
      },
      grid: baseGrid,
      position: "bottom",
      ticks: {
        color: "#0f172a",
        font: {
          size: 11,
          weight: 700,
        },
        callback(value) {
          return `${value}k`;
        },
      },
    },
    accounts: {
      beginAtZero: true,
      display: false,
      max: 100,
      position: "top",
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#0f172a",
        font: {
          size: 12,
          weight: 800,
        },
      },
    },
  },
};

const journeyOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "#ffffff",
      borderColor: "#cbd5e1",
      borderWidth: 1,
      bodyColor: "#0f172a",
      displayColors: false,
      padding: 10,
      titleColor: "#020617",
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#0f172a",
        font: {
          size: 11,
          weight: 800,
        },
        maxRotation: 0,
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      border: {
        display: false,
      },
      grid: baseGrid,
      ticks: {
        color: "#0f172a",
        font: {
          size: 11,
          weight: 700,
        },
        callback(value) {
          return `${value}%`;
        },
      },
    },
  },
};
