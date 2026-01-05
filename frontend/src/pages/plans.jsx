import React, { useState } from 'react';
import PayPlanCharts from '../components/pay_plan_charts'; // adjust the path if needed
import PlansComparisonTable from '../components/PlansComparisonTable';
import Container from "../components/banner";

const PlansPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // Shared state

  // Data for plan cards
  const plansData = [
    {
      title: 'Basic Plan',
      description:
        'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      onChoose: () => alert('Basic Plan Chosen'),
      onStartTrial: () => alert('Basic Trial Started'),
    },
    {
      title: 'Standard Plan',
      description:
        'Access to a wider selection of movies and shows, including most new releases and exclusive content.',
      monthlyPrice: 12.99,
      yearlyPrice: 129.99,
      onChoose: () => alert('Standard Plan Chosen'),
      onStartTrial: () => alert('Standard Trial Started'),
    },
    {
      title: 'Premium Plan',
      description:
        'Access to the widest selection of movies and shows, including all new releases and Offline Viewing.',
      monthlyPrice: 14.99,
      yearlyPrice: 149.99,
      onChoose: () => alert('Premium Plan Chosen'),
      onStartTrial: () => alert('Premium Trial Started'),
    },
  ];

  const getPlanPrice = (plan) => {
    const price =
      billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return `$${price}/${billingPeriod === 'monthly' ? 'Month' : 'Year'}`;
  };

  const plans = [
    {
      name: 'Basic',
      get price() {
        return getPlanPrice(plansData[0]);
      },
      content:
        'Access to a wide selection of movies and shows, including some new releases.',
      devices: 'Watch on one device simultaneously',
      freeTrial: '7 Days',
      cancelAnytime: 'Yes',
      hdr: 'No',
      dolbyAtmos: 'No',
      adFree: 'No',
      offlineViewing: 'No',
      familySharing: 'No',
    },
    {
      name: 'Standard',
      get price() {
        return getPlanPrice(plansData[1]);
      },
      content:
        'Access to a wider selection of movies and shows, including most new releases and exclusive content.',
      devices: 'Watch on Two device simultaneously',
      freeTrial: '7 Days',
      cancelAnytime: 'Yes',
      hdr: 'Yes',
      dolbyAtmos: 'Yes',
      adFree: 'Yes',
      offlineViewing: 'Yes, for select titles.',
      familySharing: 'Yes, up to 5 family members.',
      popular: true,
    },
    {
      name: 'Premium',
      get price() {
        return getPlanPrice(plansData[2]);
      },
      content:
        'Access to a widest selection of movies and shows, including all new releases and Offline Viewing.',
      devices: 'Watch on Four device simultaneously',
      freeTrial: '7 Days',
      cancelAnytime: 'Yes',
      hdr: 'Yes',
      dolbyAtmos: 'Yes',
      adFree: 'Yes',
      offlineViewing: 'Yes, for all titles.',
      familySharing: 'Yes, up to 6 family members.',
    },
  ];

  const features = [
    'Price',
    'Content',
    'Devices',
    'Free Trial',
    'Cancel Anytime',
    'HDR',
    'Dolby Atmos',
    'Ad-Free',
    'Offline Viewing',
    'Family Sharing',
  ];

  return (
    <>
      <PayPlanCharts
        heading="Choose the plan that’s right for you"
        subheading="Join StreamVibe and select from our flexible subscription options tailored to suit your viewing preferences. Get ready for non-stop entertainment!"
        plans={plansData}
        billingPeriod={billingPeriod}
        setBillingPeriod={setBillingPeriod}
      />

      <PlansComparisonTable plans={plans} features={features} />

      <div className="mt-10 px-4 md:px-50 max-w-6xl mx-auto pb-10">
        <Container />
      </div>

    </>
  );
};

export default PlansPage;
