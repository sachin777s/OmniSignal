"use client";

import {
  Chart,
  type ChartConfiguration,
  type ChartDataset,
  type ChartOptions,
  registerables,
} from "chart.js";
import { useEffect, useRef } from "react";

import type { WorkspacePerformanceData } from "@/lib/dashboard-data";

Chart.register(...registerables);

type ChartVariant = "main" | "area" | "conversion" | "duration" | "stacked";

export function WorkspacePerformanceChart({
  data,
  variant = "main",
}: {
  data: WorkspacePerformanceData;
  variant?: ChartVariant;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const chart = new Chart(canvasRef.current, getChartConfig(variant, data));

    return () => {
      chart.destroy();
    };
  }, [data, variant]);

  return <canvas ref={canvasRef} />;
}

function getChartConfig(
  variant: ChartVariant,
  data: WorkspacePerformanceData,
): ChartConfiguration {
  if (variant === "main") {
    return {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          barDataset("Captured Events", data.capturedEvents, "#168965", "events"),
          barDataset("Filtered Events", data.filteredEvents, "#cbd5e1", "events"),
          lineDataset("Total Events (24hr Avg)", data.totalEvents, "#168965"),
          lineDataset("Active Visitors", data.activeVisitors, "#86c7a4"),
        ],
      },
      options: mainChartOptions,
    };
  }

  if (variant === "duration") {
    return {
      type: "bar",
      data: {
        labels: data.miniSeries.duration.map((_, index) => `${index + 1}`),
        datasets: [
          {
            data: data.miniSeries.duration,
            backgroundColor: "#94a3b8",
            borderRadius: 3,
            barPercentage: 0.7,
            categoryPercentage: 0.82,
          },
        ],
      },
      options: miniChartOptions,
    };
  }

  if (variant === "stacked") {
    return {
      type: "bar",
      data: {
        labels: data.miniSeries.stackedBottom.map((_, index) => `${index + 1}`),
        datasets: [
          {
            data: data.miniSeries.stackedBottom,
            backgroundColor: "#168965",
            borderRadius: 2,
            stack: "pageViews",
          },
          {
            data: data.miniSeries.stackedMiddle,
            backgroundColor: "#6ee7b7",
            borderRadius: 2,
            stack: "pageViews",
          },
          {
            data: data.miniSeries.stackedTop,
            backgroundColor: "#cbd5e1",
            borderRadius: 2,
            stack: "pageViews",
          },
        ],
      },
      options: {
        ...miniChartOptions,
        scales: {
          x: { display: false, stacked: true },
          y: { display: false, stacked: true, beginAtZero: true },
        },
      },
    };
  }

  const series =
    variant === "conversion" ? data.miniSeries.conversion : data.miniSeries.area;

  return {
    type: "line",
    data: {
      labels: series.map((_, index) => `${index + 1}`),
      datasets: [
        {
          data: series,
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          borderColor: "#168965",
          borderWidth: 2,
          fill: true,
          pointRadius: 0,
          tension: 0.35,
        },
      ],
    },
    options: miniChartOptions,
  };
}

function barDataset(
  label: string,
  data: number[],
  backgroundColor: string,
  stack: string,
): ChartDataset<"bar"> {
  return {
    type: "bar",
    label,
    data,
    backgroundColor,
    borderRadius: 2,
    barPercentage: 0.72,
    categoryPercentage: 0.86,
    stack,
  };
}

function lineDataset(
  label: string,
  data: number[],
  borderColor: string,
): ChartDataset<"line"> {
  return {
    type: "line",
    label,
    data,
    borderColor,
    borderWidth: 3,
    pointBackgroundColor: borderColor,
    pointBorderColor: "#ffffff",
    pointHoverRadius: 5,
    pointRadius: 0,
    tension: 0.22,
    yAxisID: "y",
  };
}

const mainChartOptions: ChartOptions = {
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
      bodyFont: {
        size: 12,
        weight: 600,
      },
      callbacks: {
        title(items) {
          return items[0]?.label.toUpperCase() ?? "";
        },
        label(item) {
          const suffix = item.dataset.type === "line" ? "k" : "k events";
          return `${item.dataset.label}: ${item.formattedValue}${suffix}`;
        },
      },
      displayColors: true,
      padding: 10,
      titleColor: "#020617",
      titleFont: {
        size: 13,
        weight: 800,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      stacked: true,
      ticks: {
        color: "#0f172a",
        font: {
          size: 12,
          weight: 600,
        },
        maxRotation: 0,
        callback(_value, index) {
          const visibleLabels: Record<number, string> = {
            0: "MAY 1",
            2: "MAY 3",
            6: "MAY 7",
            8: "MAY 9",
            10: "MAY 11",
            12: "MAY 13",
            14: "MAY 15",
            16: "MAY 17",
            18: "MAY 19",
            20: "MAY 21",
            23: "MAY 24",
            26: "MAY 27",
            29: "MAY 30",
          };

          return visibleLabels[index] ?? "";
        },
      },
    },
    y: {
      beginAtZero: true,
      max: 25,
      stacked: false,
      border: {
        display: false,
      },
      grid: {
        color: "#e2e8f0",
      },
      ticks: {
        color: "#0f172a",
        font: {
          size: 12,
          weight: 600,
        },
        stepSize: 5,
        callback(value) {
          return Number(value) === 0 ? "0" : `${value}k`;
        },
      },
      title: {
        display: true,
        color: "#020617",
        font: {
          size: 11,
          weight: 800,
        },
        text: "EVENTS & VISITORS (COUNT)",
      },
    },
  },
};

const miniChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.35,
    },
  },
};
