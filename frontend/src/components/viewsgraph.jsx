import React, { useState, useEffect } from "react";

const ViewsGraph = ({ data = [], title = "Realtime" }) => {
  const [timeRange, setTimeRange] = useState("48h");

  const timeOptions = ["12h", "24h", "48h", "60h"];

  // Convert selected timeRange string to number of data points
  const getDataCount = () => {
    const num = parseInt(timeRange.replace("h", ""), 10);
    return num > data.length ? data.length : num;
  };

  // Slice data based on timeRange
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const count = getDataCount();
    // Get last 'count' data points
    setDisplayData(data.slice(-count));
  }, [timeRange, data]);

  // Sum of displayed data points
  const totalViews = displayData.reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#1e1e1e] text-white rounded-xl p-4 w-96 border border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-blue-400">● Updating live</p>
        </div>
      </div>

      {/* Views + Dropdown */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-4xl font-bold">{totalViews}</div>
        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#2a2a2a] text-xs rounded-md px-2 py-1 outline-none"
          >
            {timeOptions.map((opt) => (
              <option key={opt} value={opt}>
                Last {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-gray-400">Views</p>

      {/* Graph */}
      <div className="h-32 flex items-end space-x-1 mt-4 mb-2 border-b border-gray-600">
        {displayData.map((value, idx) => (
          <div
            key={idx}
            className="bg-blue-500 rounded-t-sm"
            style={{
              height: `${value}px`,
              width: `${100 / displayData.length}%`,
            }}
          />
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>-{timeRange}</span>
        <span>Now</span>
      </div>

      
    </div>
  );
};

export default ViewsGraph;
