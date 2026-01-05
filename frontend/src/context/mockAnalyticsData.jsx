// /context/mockAnalyticsData.jsx

// Utility to generate date labels for audience section
function generateDateLabels(length) {
  const baseDate = new Date(); // today
  const labels = [];

  for (let i = 0; i < length; i++) {
    const date = new Date(baseDate);
    // subtract (length - 1 - i) days so earliest is oldest
    date.setDate(baseDate.getDate() - (length - 1 - i));
    labels.push(
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }

  return labels;
}

// Utility to generate synthetic analytics data
function generateAnalyticsBlock(length, viewBase = 50, impBase = 120, ctrBase = 60, durationBase = 3.5) {
  const overview = {
    views: Array.from({ length }, (_, i) => viewBase + (i % 10)),
    watchTime: Array.from({ length }, (_, i) => Number((20 + (i % 5)).toFixed(1))),
    subscribers: Array.from({ length }, (_, i) => i % 4),
  };

  const content = {
    views: Array.from({ length }, (_, i) => viewBase + 10 + (i % 15)),
    impressions: Array.from({ length }, (_, i) => impBase + (i % 25)),
    ctr: Array.from({ length }, (_, i) => Number((ctrBase + (i % 5)).toFixed(2))),
    avgDuration: Array.from({ length }, (_, i) => Number((durationBase + (i % 2) * 0.5).toFixed(2))),
    labels: Array.from({ length }, (_, i) => `Day ${i + 1}`),
  };

  const audience = {
    monthlyAudience: Array.from({ length }, (_, i) => i % 4),
    subscribers: Array.from({ length }, (_, i) => i % 2),
    labels: generateDateLabels(length),
  };

  return { overview, content, audience };
}

export const mockAnalyticsData = {
  "7days": {
    overview: {
      views: [50, 60, 55, 70, 65, 75, 80],
      watchTime: [20.1, 22.5, 19.8, 25.3, 23.0, 27.1, 28.0],
      subscribers: [2, 3, 1, 4, 3, 5, 4],
    },
    content: {
      views: [100, 90, 95, 85, 105, 110, 98],
      impressions: [150, 140, 160, 130, 170, 180, 160],
      ctr: [66.7, 64.2, 59.3, 65.4, 61.7, 61.1, 61.25],
      avgDuration: [3.5, 3.8, 4.1, 3.7, 3.9, 4.0, 4.2],
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    },
    audience: {
      monthlyAudience: [2, 1, 0, 3, 2, 1, 2],
      subscribers: [1, 0, 1, 1, 1, 1, 0],
      labels: [
        "04 Oct 2025", "05 Oct 2025", "06 Oct 2025",
        "07 Oct 2025", "08 Oct 2025", "09 Oct 2025", "10 Oct 2025"
      ],
    },
  },

  "28days": generateAnalyticsBlock(28),

  "90days": generateAnalyticsBlock(90),

  "365days": generateAnalyticsBlock(365),

  "lifetime": generateAnalyticsBlock(50),
};
