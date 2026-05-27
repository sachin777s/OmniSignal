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

const labels = Array.from({ length: 30 }, (_, index) => `MAY ${index + 1}`);

const paid = [
  1.2, 1.5, 1.6, 2.2, 2.0, 1.7, 1.8, 2.1, 1.9, 2.2, 2.3, 2.1, 2.2, 3.1,
  4.6, 4.0, 2.5, 2.8, 4.9, 6.0, 5.1, 4.6, 3.5, 3.0, 3.9, 3.6, 4.6, 5.0,
  2.9, 2.6,
];

const referral = [
  3.8, 4.8, 5.4, 6.0, 5.5, 4.9, 5.0, 5.8, 5.2, 5.8, 5.9, 5.3, 5.0, 7.6,
  12.1, 11.8, 5.3, 5.8, 8.9, 11.2, 9.7, 8.3, 6.5, 5.7, 6.2, 7.0, 8.7, 7.4,
  6.5, 5.8,
];

const organic = [
  5.7, 7.2, 8.5, 8.2, 9.4, 8.1, 8.7, 8.3, 7.0, 8.0, 8.2, 7.5, 7.2, 10.8,
  13.0, 13.4, 7.4, 8.3, 11.1, 15.9, 13.1, 11.4, 8.5, 8.0, 9.3, 8.8, 11.4,
  13.7, 10.0, 8.8,
];

const total = [
  8.0, 10.9, 12.2, 15.0, 12.8, 10.6, 11.2, 12.8, 12.0, 12.2, 11.6, 10.2,
  9.2, 12.7, 19.5, 21.0, 10.6, 13.1, 20.1, 23.7, 19.1, 15.4, 12.1, 11.5,
  14.5, 13.5, 15.9, 20.8, 13.5, 10.5,
];

type ChartKind = "flow" | "composition";

export function TrafficFlowChart() {
  return <TrafficChart kind="flow" />;
}

export function SessionCompositionChart() {
  return <TrafficChart kind="composition" />;
}

function TrafficChart({ kind }: { kind: ChartKind }) {
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

  return <canvas ref={canvasRef} className="z-10 relative" />;
}

function getChartConfig(kind: ChartKind): ChartConfiguration {
  if (kind === "composition") {
    return {
      type: "doughnut",
      data: {
        labels: ["Organic", "Direct", "Referral", "Paid"],
        datasets: [
          {
            data: [45, 30, 15, 10],
            backgroundColor: ["#064e45", "#047857", "#34a883", "#7dd3aa"],
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 3
          },
        ],
      },
      options: compositionOptions
    };
  }

  return {
    type: "line",
    data: {
      labels,
      datasets: [
        areaDataset("Direct", total, "rgba(4, 78, 69, 0.84)", "#064e45", 3),
        areaDataset("Organic", organic, "rgba(4, 120, 87, 0.6)", "#047857", 2),
        areaDataset("Referral", referral, "rgba(52, 168, 131, 0.46)", "#168965", 2),
        areaDataset("Paid Campaign", paid, "rgba(125, 211, 170, 0.58)", "#66c99b", 2)
      ]
    },
    options: flowOptions
  };
}

function areaDataset(
  label: string,
  data: number[],
  backgroundColor: string,
  borderColor: string,
  borderWidth: number,
): ChartDataset<"line"> {
  return {
    label,
    data,
    backgroundColor,
    borderColor,
    borderWidth,
    fill: true,
    pointBackgroundColor: borderColor,
    pointBorderColor: "#ffffff",
    pointHoverRadius: 5,
    pointRadius: 0,
    tension: 0.28,
  };
}

const flowOptions: ChartOptions<"line"> = {
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
      enabled: false,
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
        color: "#020617",
        font: {
          size: 12,
          weight: 800,
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
      border: {
        display: false,
      },
      grid: {
        color: "#e2e8f0",
      },
      ticks: {
        color: "#020617",
        font: {
          size: 12,
          weight: 800,
        },
        stepSize: 5,
        callback(value) {
          return Number(value) === 0 ? "0" : `${value}k`;
        },
      },
    },
  },
};

const compositionOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "63%",
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
};
