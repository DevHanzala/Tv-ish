//Fail code 
// remove before finalizoation


import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const RealTimeActivity = ({
  newSubscribers = [],
  lastComments = [],
  recentEarnings = [],
}) => {
  return (
    <div className="bg-gray-900 text-white p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      {/* Header with real-time indicator */}
      <div className="flex items-center justify-between mb-6 px-2 sm:px-4">
        <h3 className="uppercase text-xs font-semibold text-gray-400">Real-time Activity</h3>
        <span className="w-4 h-4 rounded-full bg-red-600 animate-pulse"></span>
      </div>

      {/* New Subscribers */}
      <section className="mb-6 px-2 sm:px-4">
        <h4 className="text-sm font-semibold mb-3 text-gray-400">New Subscribers</h4>
        <div className="space-y-4">
          {newSubscribers.map((sub, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={sub.avatar}
                  alt={sub.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium truncate max-w-xs sm:max-w-sm">{sub.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs sm:max-w-sm">{sub.subscriberCount} subscribers</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">{sub.timeAgo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Last Comments */}
      <section className="mb-6 px-2 sm:px-4">
        <h4 className="text-sm font-semibold mb-3 text-gray-400">Last Comments</h4>
        <div className="space-y-4">
          {lastComments.map((comment, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <img
                src={comment.avatar}
                alt={comment.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm line-clamp-2">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-1">by {comment.name}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap mt-1 sm:mt-0 sm:ml-2">{comment.timeAgo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Earnings */}
      <section className="px-2 sm:px-4">
        <h4 className="text-sm font-semibold mb-3 text-gray-400">Recent Earnings</h4>
        <div className="space-y-4">
          {recentEarnings.map((earning, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={earning.avatar}
                  alt="earning"
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">${earning.amount}</p>
                  <div
                    className={`flex items-center text-xs ${
                      earning.change < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {earning.change < 0 ? <FaArrowDown className="mr-1" /> : <FaArrowUp className="mr-1" />}
                    {Math.abs(earning.change)}%
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">{earning.timeAgo}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RealTimeActivity;
