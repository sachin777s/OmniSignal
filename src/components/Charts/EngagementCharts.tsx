"use client";

import {
  Chart,
  type ChartConfiguration,
  type ChartDataset,
  type ChartOptions,
  registerables,
} from "chart.js";
import { useEffect, useRef } from "react";

import type { EngagementData } from "@/lib/dashboard-data";

Chart.register(...registerables);

type EngagementChartKind = "quality" | "features" | "journey";

export function EngagementQualityChart({
  data,
}: {
  data: EngagementData["qualityChart"];
}) {
  return <EngagementChart kind="quality" data={data} />;
}

export function FeatureAdoptionChart({
  data,
}: {
  data: EngagementData["featureAdoptionChart"];
}) {
  return <EngagementChart kind="features" data={data} />;
}

export function JourneyDepthChart({
  data,
}: {
  data: EngagementData["journeyDepthChart"];
}) {
  return <EngagementChart kind="journey" data={data} />;
}

function EngagementChart({
  data,
  kind,
}: {
  data:
    | EngagementData["qualityChart"]
    | EngagementData["featureAdoptionChart"]
    | EngagementData["journeyDepthChart"];
  kind: EngagementChartKind;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const chart = new Chart(canvasRef.current, getChartConfig(kind, data));

    return () => {
      chart.destroy();
    };
  }, [data, kind]);

  return <canvas ref={canvasRef} />;
}

function getChartConfig(
  kind: EngagementChartKind,
  data:
    | EngagementData["qualityChart"]
    | EngagementData["featureAdoptionChart"]
    | EngagementData["journeyDepthChart"],
): ChartConfiguration {
  if (kind === "features") {
    const chartData = data as EngagementData["featureAdoptionChart"];

    return {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          barDataset("Feature Events", chartData.events, "#047857", "events"),
          barDataset("Accounts Reached", chartData.accounts, "#99f6c8", "accounts"),
        ],
      },
      options: featureOptions,
    };
  }

  if (kind === "journey") {
    const chartData = data as EngagementData["journeyDepthChart"];

    return {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Users",
            data: chartData.values,
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

  const chartData = data as EngagementData["qualityChart"];

  return {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [
        lineDataset("Engagement Quality", chartData.quality, "#047857", "rgba(4, 120, 87, 0.16)"),
        lineDataset("Buying Intent", chartData.intent, "#66c99b", "rgba(102, 201, 155, 0.18)"),
        lineDataset("Friction Signals", chartData.friction, "#94a3b8", "rgba(148, 163, 184, 0.12)"),
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
