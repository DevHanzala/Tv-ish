import React from "react";

const LineGraph = ({
  datasets,
  selectedMetric,
  onMetricSelect,
  height,
  xLabels,
}) => {
  const paddingLeft = 40;
  const paddingRight = 40; // ✅ Added right padding
  const paddingTop = 20;
  const paddingBottom = 50;

  const viewBoxWidth = 1200;
  const viewBoxHeight = height + paddingTop + paddingBottom;

  // Active dataset
  const activeDataset =
    datasets.find((d) => d.label === selectedMetric) || datasets[0];
  const data = activeDataset.data;

  // Dynamic min/max
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  // Y-scale conversion
  const scaleY = (val) => {
    if (maxValue === minValue) return height / 2 + paddingTop;
    return (
      paddingTop +
      (height - ((val - minValue) / (maxValue - minValue)) * height)
    );
  };

  // Points for line
  const generatePoints = (data) =>
    data.map((val, i) => {
      const x =
        (i / (data.length - 1)) *
          (viewBoxWidth - paddingLeft - paddingRight) +
        paddingLeft;
      const y = scaleY(val);
      return `${x},${y}`;
    });

  // Data point circles
  const renderCircles = (data, color) =>
    data.map((val, i) => {
      const x =
        (i / (data.length - 1)) *
          (viewBoxWidth - paddingLeft - paddingRight) +
        paddingLeft;
      const y = scaleY(val);
      return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
    });

  // Totals for each metric
  const totals = datasets.map((d) => ({
    label: d.label,
    total: d.data.reduce((a, b) => a + b, 0),
    color: d.color,
  }));

  // Y-axis labels
  const yAxisLabelsCount = 5;
  const yAxisLabels = [];
  for (let i = 0; i < yAxisLabelsCount; i++) {
    const val =
      minValue + ((maxValue - minValue) / (yAxisLabelsCount - 1)) * i;
    yAxisLabels.push(val.toFixed(2));
  }
  yAxisLabels.reverse();

  return (
    <div className="w-full">
      {/* Metric boxes */}
      <div
        className="flex flex-wrap gap-4 mb-6"
        style={{
          maxWidth: viewBoxWidth,
          width: "100%",
          marginBottom: "1.5rem",
        }}
      >
        {totals.map(({ label, total, color }) => {
          const isActive = selectedMetric === label;
          return (
            <button
              key={label}
              onClick={() => onMetricSelect(label)}
              type="button"
              className={`p-4 rounded-lg border transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-black/30 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
              style={{
                flexGrow: 1,
                flexBasis: 0,
                minWidth: "180px",
              }}
            >
              <p className="text-lg font-bold" style={{ color }}>
                {total.toFixed(0)}
              </p>
              <p className="text-sm">{label}</p>
            </button>
          );
        })}
      </div>

      {/* SVG Graph */}
      <div style={{ overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
          style={{ width: `${viewBoxWidth}px`, height: viewBoxHeight }}
        >
          {/* Y-axis lines and labels */}
          {yAxisLabels.map((val, idx) => {
            const y = paddingTop + (idx / (yAxisLabels.length - 1)) * height;
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={viewBoxWidth - paddingRight}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeDasharray="4"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="12"
                  fill="#9ca3af"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Line and points */}
          <polyline
            fill="none"
            stroke={activeDataset.color}
            strokeWidth="2"
            points={generatePoints(data).join(" ")}
          />
          {renderCircles(data, activeDataset.color)}

          {/* X-axis labels */}
          {xLabels.map((label, idx) => {
            const x =
              (idx / (xLabels.length - 1)) *
                (viewBoxWidth - paddingLeft - paddingRight) +
              paddingLeft;
            return (
              <text
                key={idx}
                x={x}
                y={viewBoxHeight - 10}
                textAnchor="middle"
                fontSize="12"
                fill="#9ca3af"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default LineGraph;
