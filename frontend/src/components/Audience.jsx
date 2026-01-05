import React, { useState, useEffect } from "react";
import LineGraph from "../components/LineGraph";

const Audience = ({ dateRange }) => {
  const [selectedMetric, setSelectedMetric] = useState("Monthly Audience");

  const [monthlyAudience, setMonthlyAudience] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [labels, setLabels] = useState([]);

  const getDataPoints = (range) => {
    switch (range) {
      case "7days": return 7;
      case "28days": return 28;
      case "90days": return 90;
      case "365days": return 30;
      case "lifetime":
      default: return 50;
    }
  };

  const generateAudienceData = (range) => {
    const points = getDataPoints(range);
    const audience = [];
    const subs = [];
    const xLabels = [];

    for (let i = 0; i < points; i++) {
      const aud = Math.floor(Math.random() * 4); // Simulating audience number (0-3)
      const sub = Math.floor(Math.random() * 2); // Simulating subscribers (0-1)

      audience.push(aud);
      subs.push(sub);
      xLabels.push(
        new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
      );
    }

    return { audience, subs, xLabels };
  };

  useEffect(() => {
    const { audience, subs, xLabels } = generateAudienceData(dateRange);
    setMonthlyAudience(audience);
    setSubscribers(subs);
    setLabels(xLabels);
  }, [dateRange]);

  const datasets = [
    { label: "Monthly Audience", data: monthlyAudience, color: "#a855f7" },
    { label: "Subscribers", data: subscribers, color: "#facc15" },
  ];

  const reducedXLabels = labels.map((label, idx) =>
    idx % Math.ceil(labels.length / 10) === 0 ? label : ""
  );

  return (
    <div className="text-white">
      <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
        <div className="mb-4 flex justify-between">
          <div>
            <h2 className="text-md font-semibold">Monthly audience</h2>
          </div>
          <div>
            <h2 className="text-md font-semibold">Subscribers</h2>
          </div>
        </div>

        <LineGraph
          datasets={datasets}
          selectedMetric={selectedMetric}
          onMetricSelect={setSelectedMetric}
          height={200}
          xLabels={reducedXLabels}
        />

        <div className="flex justify-start mt-4">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 text-sm rounded">
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Audience;
