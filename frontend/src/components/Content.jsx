import React, { useState, useEffect } from "react";
import LineGraph from "../components/LineGraph";

const Content = ({ dateRange }) => {
  const [selectedMetric, setSelectedMetric] = useState("Views");

  const [views, setViews] = useState([]);
  const [impressions, setImpressions] = useState([]);
  const [ctr, setCtr] = useState([]);
  const [avgDuration, setAvgDuration] = useState([]);
  const [labels, setLabels] = useState([]);

  // Helper to get number of data points based on range
  const getDataPoints = (range) => {
    switch (range) {
      case "7days": return 7;
      case "28days": return 28;
      case "90days": return 90;
      case "365days": return 30; // You can update this to 365 if desired
      case "lifetime":
      default: return 50;
    }
  };

  // Generate random content data based on date range
  const generateContentData = (range) => {
    const points = getDataPoints(range);
    const _views = [];
    const _impressions = [];
    const _ctr = [];
    const _avgDuration = [];
    const _labels = [];

    for (let i = 0; i < points; i++) {
      const v = Math.floor(Math.random() * 100 + 50);
      const imp = v + Math.floor(Math.random() * 100);
      const ctrVal = Number(((v / imp) * 100).toFixed(2));
      const dur = Number((Math.random() * 2 + 2.5).toFixed(2)); // Between 2.5 and 4.5 min

      _views.push(v);
      _impressions.push(imp);
      _ctr.push(ctrVal);
      _avgDuration.push(dur);
      _labels.push(`Day ${i + 1}`);
    }

    return { views: _views, impressions: _impressions, ctr: _ctr, avgDuration: _avgDuration, labels: _labels };
  };

  useEffect(() => {
    const { views, impressions, ctr, avgDuration, labels } = generateContentData(dateRange);
    setViews(views);
    setImpressions(impressions);
    setCtr(ctr);
    setAvgDuration(avgDuration);
    setLabels(labels);
  }, [dateRange]);

  const datasets = [
    { label: "Views", data: views, color: "#3b82f6" },
    { label: "Impressions", data: impressions, color: "#10b981" },
    { label: "Click Through Rate (%)", data: ctr, color: "#f59e0b" },
    { label: "Avg View Duration (min)", data: avgDuration, color: "#ef4444" },
  ];

  const reducedXLabels = labels.map((label, idx) =>
    idx % Math.ceil(labels.length / 10) === 0 ? label : ""
  );

  return (
    <div className="text-white">
      <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
        <LineGraph
          datasets={datasets}
          selectedMetric={selectedMetric}
          onMetricSelect={setSelectedMetric}
          height={200}
          xLabels={reducedXLabels}
        />
      </div>
    </div>
  );
};

export default Content;
