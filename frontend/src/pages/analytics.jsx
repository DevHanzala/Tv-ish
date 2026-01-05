import React, { useState, useEffect } from "react";
import ViewsGraph from "../components/viewsgraph";
import LineGraph from "../components/LineGraph";
import Content from "../components/Content";
import Audience from "../components/Audience";
import Trend from "../components/Trend";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [dateRange, setDateRange] = useState("lifetime");

  // NEW: selected metric for graph
  const [selectedMetric, setSelectedMetric] = useState("Views");

  const tabs = ["Overview", "Content", "Audience" /* , "Trends"*/ ];

  const generateMetricsByRange = (range) => {
    let dataPoints = 0;
    switch (range) {
      case "7days":
        dataPoints = 7;
        break;
      case "28days":
        dataPoints = 28;
        break;
      case "90days":
        dataPoints = 90;
        break;
      case "365days":
        dataPoints = 30;
        break;
      case "lifetime":
      default:
        dataPoints = 50;
        break;
    }

    const views = [];
    const watchTime = [];
    const subscribers = [];

    for (let i = 0; i < dataPoints; i++) {
      const v = Math.floor(Math.random() * 50);
      const w = Number((v * 0.5 + Math.random() * 10).toFixed(1));
      const s = Math.floor(v / 15 + Math.random() * 3);

      views.push(v);
      watchTime.push(w);
      subscribers.push(s);
    }

    return { views, watchTime, subscribers };
  };

  const generateXLabels = (data) => {
    const labels = [];
    const step = Math.floor(data.length / 5) || 1;

    for (let i = 0; i < data.length; i += step) {
      labels.push(i.toString());
    }
    labels.push(`${data.length - 1} days`);
    return labels;
  };

  const [viewsData, setViewsData] = useState([]);
  const [watchTimeData, setWatchTimeData] = useState([]);
  const [subscribersData, setSubscribersData] = useState([]);

  const [realtimeData] = React.useState(() =>
    Array.from({ length: 50 }, () => Math.floor(Math.random() * 50))
  );

  useEffect(() => {
    const { views, watchTime, subscribers } = generateMetricsByRange(dateRange);
    setViewsData(views);
    setWatchTimeData(watchTime);
    setSubscribersData(subscribers);
  }, [dateRange]);

  const datasets = [
    { label: "Views", data: viewsData, color: "#3b82f6" },
    { label: "Watch Time (hours)", data: watchTimeData, color: "#10b981" },
    { label: "Subscribers", data: subscribersData, color: "#f59e0b" },
  ];

  const maxValue = Math.max(...viewsData, ...watchTimeData, ...subscribersData, 50);

  // 👇 Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#1e1e1e] rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-bold mb-6">
                This video has had {viewsData.reduce((a, b) => a + b, 0)} views{" "}
                {dateRange === "lifetime" ? "since it was published" : "in the selected range"}
              </h2>

              <LineGraph
                datasets={datasets}
                selectedMetric={selectedMetric}
                onMetricSelect={setSelectedMetric}
                maxValue={maxValue}
                height={180}
                yLabels={[maxValue, Math.round(maxValue / 2), 0]}
                xLabels={generateXLabels(
                  datasets.find((d) => d.label === selectedMetric)?.data || viewsData
                )}
              />
            </div>

            <ViewsGraph data={realtimeData} title="Realtime" />
          </div>
        );
      case "Content":
        return <Content dateRange={dateRange} />;
      case "Audience":
        return <Audience dateRange={dateRange} />;
      case "Trends":
        return <Trend />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-6 pt-14">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Video Analytics</h1>

        {/* Date Range Selector */}
        {["Overview", "Audience", "Content"].includes(activeTab) && (
          <div className="flex items-center mt-3 md:mt-0 space-x-2 p-3">
            <span className="text-sm text-gray-400">Date Range:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-[#1e1e1e] text-sm px-3 py-2 rounded border border-gray-700"
            >
              <option value="7days">Last 7 days</option>
              <option value="28days">Last 28 days</option>
              <option value="90days">Last 90 days</option>
              <option value="365days">Last 365 days</option>
              <option value="lifetime">Lifetime (Since published)</option>
            </select>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-black"
                : "bg-[#1e1e1e] text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Analytics;
