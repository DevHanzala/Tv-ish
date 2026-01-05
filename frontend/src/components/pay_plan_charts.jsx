import React from 'react';

const PlanCard = ({ title, description, price, onChoose, onStartTrial, billingPeriod }) => {
  return (
    <div className="bg-gradient-to-br from-[#1e1e1e] to-[#121212] p-6 rounded-2xl w-full max-w-md sm:max-w-sm md:max-w-xs lg:max-w-sm text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <h3 className="text-xl sm:text-2xl font-extrabold mb-3 tracking-wide">{title}</h3>
      <p className="text-gray-400 mb-8 leading-relaxed text-xs sm:text-sm md:text-base">{description}</p>
      <p className="text-2xl sm:text-3xl font-bold mb-6">
        ${price}
        <span className="text-sm sm:text-base font-normal text-gray-500">
          /{billingPeriod === 'monthly' ? 'month' : 'year'}
        </span>
      </p>
      <div className="flex flex-col gap-3">
        <button
          className="bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition shadow-sm w-full"
          onClick={onStartTrial}
          aria-label={`Start free trial for ${title} plan`}
        >
          Start Free Trial
        </button>
        <button
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition shadow-sm w-full"
          onClick={onChoose}
          aria-label={`Choose the ${title} plan`}
        >
          Choose Plan
        </button>
      </div>
    </div>
  );
};

const PayPlanCharts = ({ heading, subheading, plans, billingPeriod, setBillingPeriod }) => {
  const filteredPlans = plans.map((plan) => ({
    ...plan,
    price: billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice,
  }));

  return (
    <div className="bg-black min-h-screen pt-20 sm:pt-24 px-1">
      <div>
        {/* Heading */}
        <div className="text-white text-center mb-12 sm:mb-16 px-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{heading}</h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">{subheading}</p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center mb-12 sm:mb-16 px-2">
          <div className="bg-[#2a2a2a] p-1 rounded-full inline-flex space-x-2">
            <button
              className={`px-5 py-2 rounded-full font-semibold shadow-md text-sm sm:text-base transition ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'text-white hover:bg-[#3a3a3a]'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-5 py-2 rounded-full font-semibold shadow-md text-sm sm:text-base transition ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'text-white hover:bg-[#3a3a3a]'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8 flex-wrap px-2">
          {filteredPlans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              onChoose={plan.onChoose}
              onStartTrial={plan.onStartTrial}
              billingPeriod={billingPeriod} // ✅ Pass the billingPeriod to PlanCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayPlanCharts;
