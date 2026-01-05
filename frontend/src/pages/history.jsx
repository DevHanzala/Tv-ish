import React from "react";

const historyData = {
  Today: [
    {
      id: 1,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/1.png",
    },
    {
      id: 2,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/2.png",
    },
    {
      id: 3,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/3.png",
    },
  ],
  Yesterday: [
    {
      id: 4,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/4.png",
    },
    {
      id: 5,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/5.png",
    },
    {
      id: 6,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/6.png",
    },
    {
      id: 7,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/7.png",
    },
    {
      id: 8,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/9.png",
    },
    {
      id: 9,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/9-1.png",
    },
    {
      id: 10,
      title: "The Science of Sleep",
      views: "10K views",
      timeAgo: "2 years ago",
      thumbnail: "/images/9-2.png",
    },
  ],
};

const History = () => {
  return (
    <div className="bg-black min-h-screen text-white max-w-4xl ml-0 pt-14 pl-4">
      <h1 className="text-red-600 font-bold text-lg mb-4">History</h1>
      <p className="text-gray-400 mb-6">Videos you’ve watched</p>

      {Object.entries(historyData).map(([day, videos]) => (
        <div key={day} className="mb-8">
          <h2 className="font-semibold text-sm mb-4">{day}</h2>

          <div className="space-y-3">
            {videos.map(({ id, title, views, timeAgo, thumbnail }) => (
              <div
                key={id}
                className="flex items-center gap-4 bg-[#151515] p-3 rounded"
              >
                <div className="flex flex-col gap-2 w-14">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="w-14 h-14 object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-gray-500">
                    {views} • {timeAgo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
