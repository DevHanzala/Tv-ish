import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  EyeIcon,
  ClockIcon,
  UserPlusIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const iconMap = {
  Views: EyeIcon,
  "Watch time": ClockIcon,
  Subscribers: UserPlusIcon,
  Earnings: CurrencyDollarIcon,
};

const chartData = {
  weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      { label: "Views", data: [100, 120, 130, 110, 160, 170, 180] },
      { label: "Previous Views", data: [90, 110, 115, 105, 140, 150, 160] },
      { label: "Watch time", data: [80, 90, 100, 95, 105, 110, 120] },
      { label: "Previous Watch time", data: [75, 85, 90, 90, 100, 105, 110] },
      { label: "Subscribers", data: [5, 7, 6, 8, 9, 10, 11] },
      { label: "Previous Subscribers", data: [4, 6, 5, 7, 8, 9, 10] },
      { label: "Earnings", data: [20, 22, 23, 25, 27, 29, 30] },
      { label: "Previous Earnings", data: [18, 20, 21, 23, 25, 26, 28] },
    ],
  },

  monthly: {
    labels: [
      "JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC",
    ],
    datasets: [
      { label: "Views", data: [150, 160, 170, 180, 200, 210, 230, 250, 250, 400, 450, 500] },
      { label: "Previous Views", data: [140, 155, 165, 170, 190, 200, 215, 240, 250, 350, 400, 450] },
      { label: "Watch time", data: [90, 95, 100, 105, 110, 115, 120, 125, 135, 150, 170, 180] },
      { label: "Previous Watch time", data: [85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 150, 160] },
      { label: "Subscribers", data: [10, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 30] },
      { label: "Previous Subscribers", data: [9, 11, 12, 13, 15, 17, 19, 20, 22, 24, 26, 28] },
      { label: "Earnings", data: [30, 32, 35, 38, 40, 42, 45, 47, 50, 55, 60, 65] },
      { label: "Previous Earnings", data: [28, 30, 33, 35, 38, 40, 43, 45, 47, 50, 55, 60] },
    ],
  },

  yearly: {
    labels: [
      "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025",
    ],
    datasets: [
      { label: "Views", data: [1000, 1200, 1300, 1100, 1600, 1700, 1800, 1900, 2000, 2200, 2500, 3000] },
      { label: "Previous Views", data: [900, 1100, 1250, 1050, 1500, 1600, 1700, 1800, 1900, 2000, 2200, 2500] },
      { label: "Watch time", data: [800, 900, 1000, 950, 1050, 1100, 1200, 1250, 1300, 1400, 1500, 1600] },
      { label: "Previous Watch time", data: [750, 850, 950, 900, 1000, 1050, 1100, 1150, 1000, 1200, 1300, 1400] },
      { label: "Subscribers", data: [50, 70, 60, 80, 90, 100, 110, 115, 120, 130, 140, 150] },
      { label: "Previous Subscribers", data: [45, 65, 55, 75, 85, 95, 105, 110, 115, 120, 130, 140] },
      { label: "Earnings", data: [200, 220, 230, 250, 270, 290, 300, 320, 350, 400, 450, 500] },
      { label: "Previous Earnings", data: [190, 210, 220, 240, 260, 280, 290, 310, 340, 380, 400, 450] },
    ],
  },
};

const AnalyticsGraph = () => {
  const [selectedStat, setSelectedStat] = useState("Views");
  const [selectedRange, setSelectedRange] = useState("weekly");

  // Compute stats for display (current value, % change from previous)
  const stats = useMemo(() => {
    const data = chartData[selectedRange] || { labels: [], datasets: [] };
    const lastIndex = data.labels.length - 1;

    const findDataset = (label) => data.datasets.find((d) => d.label === label);

    const current = findDataset(selectedStat)?.data[lastIndex] ?? 0;
    const previous = findDataset(`Previous ${selectedStat}`)?.data[lastIndex] ?? 0;

    const calcChange = (currentVal, prevVal) => {
      if (prevVal === 0) return 0;
      return ((currentVal - prevVal) / prevVal) * 100;
    };

    // Build stats for all four stats
    return ["Views", "Watch time", "Subscribers", "Earnings"].map((label) => {
      const curr = findDataset(label)?.data[lastIndex] ?? 0;
      const prev = findDataset(`Previous ${label}`)?.data[lastIndex] ?? 0;
      const change = calcChange(curr, prev);
      const displayValue = label === "Earnings" ? `$${curr.toFixed(2)}` : curr;
      return { label, value: displayValue, change };
    });
  }, [selectedRange]);

  // Extract current and previous datasets for selectedStat and range
  const rawChartData = chartData[selectedRange] || { labels: [], datasets: [] };
  const currentDataset = rawChartData.datasets.find((d) => d.label === selectedStat);
  const previousDataset = rawChartData.datasets.find((d) => d.label === `Previous ${selectedStat}`);

  // Helper to find max value in datasets (for dynamic y-axis max)
  const getMaxDataValue = (datasets) => {
    let maxVal = 0;
    datasets.forEach((ds) => {
      if (ds && ds.data && ds.data.length > 0) {
        const dsMax = Math.max(...ds.data);
        if (dsMax > maxVal) maxVal = dsMax;
      }
    });
    return maxVal;
  };

  const maxDataValue = getMaxDataValue([currentDataset, previousDataset]);
  const yAxisMax = maxDataValue > 0 ? Math.ceil(maxDataValue * 1.1) : undefined;

  // Prepare chart data for react-chartjs-2 Line component
  const filteredChartData = {
    labels: rawChartData.labels,
    datasets: [
      currentDataset && {
        ...currentDataset,
        label: "Current",
        borderColor: "#10B981",
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(16,185,129,0.3)");
          gradient.addColorStop(1, "rgba(16,185,129,0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 7,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
        pointBackgroundColor: "#10B981",
      },

      previousDataset && {
        ...previousDataset,
        label: "Previous",
        borderColor: "#6B7280",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ].filter(Boolean),
  };

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-lg w-full shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-xl font-bold tracking-tight">My Channel Overview</h2>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="bg-gray-800 text-white text-sm px-4 py-2 rounded border border-gray-700 hover:border-gray-500 focus:outline-none focus:ring focus:ring-green-500/30"
        >
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>
      </div>

      {/* Stat Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map(({ label, value, change }) => {
          const isSelected = selectedStat === label;
          const Icon = iconMap[label];

          // Display change with 2 decimals
          const displayChange = typeof change === "number" ? change.toFixed(2) : change;

          return (
            <button
              key={label}
              onClick={() => setSelectedStat(label)}
              className={`group p-4 rounded-lg transition-all duration-300 ease-in-out
                flex flex-col gap-1 justify-center items-start border
                ${isSelected ? "bg-green-600 border-green-400 shadow-lg" : "bg-gray-800 border-gray-700 hover:bg-gray-700"}
              `}
            >
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Icon className="h-4 w-4 text-green-400" />
                {label}
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div
                className={`text-sm font-medium ${
                  change >= 0 ? "text-green-400" : "text-red-500"
                }`}
              >
                {change >= 0 ? "↑" : "↓"} {Math.abs(displayChange)}%
              </div>
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-gray-800 rounded-xl p-4 shadow-md w-full aspect-[16/9] min-h-[250px]">
        <Line
          data={filteredChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "#111827",
                titleColor: "#fff",
                bodyColor: "#d1d5db",
                borderColor: "#374151",
                borderWidth: 1,
                cornerRadius: 10,
                padding: 14,
                displayColors: false,
                callbacks: {
                  title: (ctx) => `📅 ${ctx[0].label}`,
                  label: (ctx) => {
                    const label = ctx.dataset.label || "";
                    const value = ctx.formattedValue;
                    return `📊 ${label}: ${value}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: yAxisMax,
                ticks: { color: "#9CA3AF" },
                grid: { color: "#374151", borderDash: [4, 4] },
              },
              x: {
                ticks: { color: "#9CA3AF" },
                grid: { color: "#374151" },
              },
            },
            elements: {
              point: {
                radius: 0,
                hoverRadius: 6,
                backgroundColor: "#10B981",
                borderWidth: 2,
                hoverBorderColor: "#ffffff",
              },
              line: {
                tension: 0.4,
                borderWidth: 3,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AnalyticsGraph;
