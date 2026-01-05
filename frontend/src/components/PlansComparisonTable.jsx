import React from "react";

const PlansComparisonTable = ({ plans = [], features = [] }) => {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-center tracking-tight">
          Choose the Right Plan for You
        </h2>
        <p className="text-gray-400 mb-12 text-center max-w-2xl mx-auto text-lg md:text-xl">
          StreamVibe gives you flexible pricing with rich features. Compare below and pick what suits you best.
        </p>

        <div className="overflow-x-auto rounded-3xl shadow-xl ring-1 ring-white/10 backdrop-blur-sm bg-white/5">
          <table className="w-full text-sm md:text-base border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white/10 text-left uppercase text-xs md:text-sm text-gray-400 tracking-widest">
                <th className="p-6 text-white text-base">Features</th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className="p-6 text-center font-bold text-white relative"
                  >
                    <div className="text-lg">{plan.name}</div>
                    {plan.popular && (
                      <span className="absolute top-2 right-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] px-3 py-0.5 rounded-full font-semibold shadow-md uppercase tracking-wide">
                        Most Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => {
                const keyMap = {
                  "Price": "price",
                  "Content": "content",
                  "Devices": "devices",
                  "Free Trial": "freeTrial",
                  "Cancel Anytime": "cancelAnytime",
                  "HDR": "hdr",
                  "Dolby Atmos": "dolbyAtmos",
                  "Ad-Free": "adFree",
                  "Offline Viewing": "offlineViewing",
                  "Family Sharing": "familySharing",
                };
                const key = keyMap[feature];

                return (
                  <tr
                    key={feature}
                    className={`transition-all duration-200 border-t border-white/10 ${
                      idx % 2 === 0 ? "bg-white/5" : "bg-white/10"
                    } hover:bg-white/20`}
                  >
                    <td className="p-6 font-medium text-white whitespace-nowrap">
                      {feature}
                    </td>
                    {plans.map((plan) => (
                      <td
                        key={plan.name + feature}
                        className="p-6 text-center font-medium"
                      >
                        {typeof plan[key] === "boolean" ? (
                          plan[key] ? (
                            <span className="text-emerald-400 text-xl">✔</span>
                          ) : (
                            <span className="text-red-500 text-xl">✘</span>
                          )
                        ) : (
                          <span className="text-gray-100">{plan[key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlansComparisonTable;
