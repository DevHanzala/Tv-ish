import React from "react";

const Sidebar = ({ subscribers, comments, earnings }) => {
  return (
    <div className="w-full bg-gray-900 text-white p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
      {/* Header (span all columns on small screens) */}
      <div className="col-span-1 sm:col-span-3 lg:col-span-1 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-300 uppercase">
          Real-Time Activity
        </h2>
        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </div>

      {/* Subscribers */}
      <div className="w-full">
        <h3 className="text-xs text-gray-400 mb-2 uppercase">New Subscribers</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
          {subscribers.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3 overflow-hidden">
                <img
                  src={s.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="truncate w-full">
                  <p className="text-sm truncate">{s.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {s.subCount} subscribers
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {s.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="w-full">
        <h3 className="text-xs text-gray-400 mb-2 uppercase">Last Comments</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
          {comments.map((c, idx) => (
            <div key={idx} className="flex items-start space-x-2 w-full">
              <img
                src={c.avatar}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                alt=""
              />
              <div className="truncate w-full">
                <p className="text-sm truncate">{c.text}</p>
                <p className="text-xs text-gray-500 truncate">by {c.nickname}</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
                {c.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings */}
      <div className="w-full">
        <h3 className="text-xs text-gray-400 mb-2 uppercase">Recent Earnings</h3>
        <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
          {earnings.map((e, idx) => (
            <div key={idx} className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <img
                  src={e.avatar}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                  alt=""
                />
                <div>
                  <p className="text-sm text-green-400">${e.amount}</p>
                  <p
                    className={`text-xs ${
                      e.change > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {e.change > 0 ? "↑" : "↓"} {Math.abs(e.change)}%
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {e.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
