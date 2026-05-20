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

const chartLabels = Array.from({ length: 30 }, (_, index) => `MAY ${index + 1}`);

const totalEvents = [
  8.2, 10.8, 12.4, 15.1, 12.8, 10.6, 11.2, 12.9, 12.1, 12.5, 11.7, 10.3, 9.8,
  13.7, 20.1, 20.9, 10.4, 13.1, 19.8, 22.6, 18.6, 15.4, 12.5, 11.7, 14.6,
  13.5, 16.1, 21.0, 13.8, 10.6,
];

const activeVisitors = [
  5.9, 7.8, 9.1, 8.4, 9.6, 8.2, 8.7, 8.1, 7.1, 8.2, 8.5, 7.7, 7.6, 11.8,
  15.3, 14.2, 8.1, 8.4, 10.2, 14.8, 12.0, 11.2, 8.7, 8.4, 9.2, 10.6, 13.4,
  12.0, 9.6, 8.8,
];

const capturedEvents = [
  1.9, 2.2, 2.1, 2.8, 2.7, 1.9, 2.4, 2.5, 2.4, 2.3, 2.6, 2.5, 2.7, 3.5,
  4.8, 4.4, 2.6, 2.9, 3.7, 4.9, 3.0, 2.8, 2.4, 2.6, 2.9, 2.8, 3.2, 3.5,
  2.9, 1.8,
];

const filteredEvents = [
  1.1, 1.4, 1.2, 1.7, 1.4, 1.2, 1.3, 1.4, 1.3, 1.2, 1.6, 1.5, 1.6, 1.9,
  2.3, 1.9, 1.2, 1.6, 1.7, 2.0, 2.3, 2.0, 1.6, 1.7, 2.0, 1.8, 1.9, 1.9,
  1.7, 1.2,
];

const miniSeries = {
  area: [
    7, 10, 12, 10, 11, 10, 11, 10, 13, 9, 12, 17, 10, 18, 21, 14, 11, 13,
    18, 9,
  ],
  conversion: [
    2.1, 1.5, 1.8, 2.0, 1.9, 3.4, 2.8, 2.5, 2.4, 1.7, 2.3, 2.7,
  ],
  duration: [62, 70, 58, 67, 47, 55, 56, 50, 54, 46],
  stackedBottom: [34, 29, 23, 24, 28, 23, 20, 16],
  stackedMiddle: [23, 28, 21, 21, 26, 22, 18, 15],
};

type ChartVariant = "main" | "area" | "conversion" | "duration" | "stacked";

export function WorkspacePerformanceChart({
  variant = "main",
}: {
  variant?: ChartVariant;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const chart = new Chart(canvasRef.current, getChartConfig(variant));

    return () => {
      chart.destroy();
    };
  }, [variant]);

  return <canvas ref={canvasRef} />;
}

function getChartConfig(variant: ChartVariant): ChartConfiguration {
  if (variant === "main") {
    return {
      type: "bar",
      data: {
        labels: chartLabels,
        datasets: [
          barDataset("Captured Events", capturedEvents, "#168965", "events"),
          barDataset("Filtered Events", filteredEvents, "#cbd5e1", "events"),
          lineDataset("Total Events (24hr Avg)", totalEvents, "#168965"),
          lineDataset("Active Visitors", activeVisitors, "#86c7a4"),
        ],
      },
      options: mainChartOptions,
    };
  }

  if (variant === "duration") {
    return {
      type: "bar",
      data: {
        labels: miniSeries.duration.map((_, index) => `${index + 1}`),
        datasets: [
          {
            data: miniSeries.duration,
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
        labels: miniSeries.stackedBottom.map((_, index) => `${index + 1}`),
        datasets: [
          {
            data: miniSeries.stackedBottom,
            backgroundColor: "#168965",
            borderRadius: 2,
            stack: "pageViews",
          },
          {
            data: miniSeries.stackedMiddle,
            backgroundColor: "#6ee7b7",
            borderRadius: 2,
            stack: "pageViews",
          },
          {
            data: [18, 14, 13, 11, 10, 9, 8, 7],
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

  const data = variant === "conversion" ? miniSeries.conversion : miniSeries.area;

  return {
    type: "line",
    data: {
      labels: data.map((_, index) => `${index + 1}`),
      datasets: [
        {
          data,
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
