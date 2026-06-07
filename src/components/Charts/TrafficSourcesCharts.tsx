"use client";

import {
  Chart,
  type ChartConfiguration,
  type ChartDataset,
  type ChartOptions,
  registerables,
} from "chart.js";
import { useEffect, useRef } from "react";

import type { TrafficSourcesData } from "@/lib/dashboard-data";

Chart.register(...registerables);

type ChartKind = "flow" | "composition";

export function TrafficFlowChart({ data }: { data: TrafficSourcesData["flow"] }) {
  return <TrafficChart kind="flow" data={data} />;
}

export function SessionCompositionChart({
  data,
}: {
  data: TrafficSourcesData["sessionComposition"];
}) {
  return <TrafficChart kind="composition" data={data} />;
}

function TrafficChart({
  data,
  kind,
}: {
  data: TrafficSourcesData["flow"] | TrafficSourcesData["sessionComposition"];
  kind: ChartKind;
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

  return <canvas ref={canvasRef} className="z-10 relative" />;
}

function getChartConfig(
  kind: ChartKind,
  data: TrafficSourcesData["flow"] | TrafficSourcesData["sessionComposition"],
): ChartConfiguration {
  if (kind === "composition") {
    const compositionData = data as TrafficSourcesData["sessionComposition"];

    return {
      type: "doughnut",
      data: {
        labels: compositionData.labels,
        datasets: [
          {
            data: compositionData.values,
            backgroundColor: ["#064e45", "#047857", "#34a883", "#7dd3aa"],
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 3,
          },
        ],
      },
      options: compositionOptions,
    };
  }

  const flowData = data as TrafficSourcesData["flow"];

  return {
    type: "line",
    data: {
      labels: flowData.labels,
      datasets: [
        areaDataset("Direct", flowData.direct, "rgba(4, 78, 69, 0.84)", "#064e45", 3),
        areaDataset("Organic", flowData.organic, "rgba(4, 120, 87, 0.6)", "#047857", 2),
        areaDataset("Referral", flowData.referral, "rgba(52, 168, 131, 0.46)", "#168965", 2),
        areaDataset("Paid Campaign", flowData.paid, "rgba(125, 211, 170, 0.58)", "#66c99b", 2),
      ],
    },
    options: flowOptions,
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
