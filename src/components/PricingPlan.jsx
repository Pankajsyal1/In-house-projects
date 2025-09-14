import React from 'react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: [
      'Real-time preview',
      'Basic keyboard shortcuts',
      'File import/export',
      'Light/Dark themes',
      'Basic formatting'
    ],
    highlighted: false
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    features: [
      'Everything in Free',
      'Advanced shortcuts',
      'Mermaid diagrams',
      'Math equations',
      'Custom themes',
      'Cloud sync',
      'Collaboration tools',
      'Priority support'
    ],
    highlighted: true
  },
  {
    name: 'Team',
    price: '$19',
    period: 'per user/month',
    features: [
      'Everything in Pro',
      'Team workspaces',
      'Advanced collaboration',
      'Admin controls',
      'SSO integration',
      'Custom branding',
      'Analytics dashboard'
    ],
    highlighted: false
  }
];

{/* Pricing Section */ }
const PricingPlan = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade when you need more power. No hidden fees, cancel anytime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${plan.highlighted
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl transform scale-105'
                : 'bg-gray-100 dark:bg-gray-900'
                } hover:shadow-xl transition-all duration-200`}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-1">{plan.price}</div>
                <div className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-600 dark:text-gray-300'}`}>
                  {plan.period}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className={`mr-3 ${plan.highlighted ? 'text-green-300' : 'text-green-500'}`}>✓</span>
                    <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-700 dark:text-gray-300'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${plan.highlighted
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
              >
                {plan.name === 'Free' ? 'Get Started' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPlan