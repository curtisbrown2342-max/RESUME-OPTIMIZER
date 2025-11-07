'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  priceId?: string;
  popular?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with basic analysis',
    features: [
      '1 resume analysis',
      'Basic feedback',
      'ATS score',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: 9,
    description: 'For serious job seekers',
    features: [
      'Unlimited analyses',
      'Detailed feedback',
      'ATS score & tips',
      'Priority support',
    ],
    priceId: 'price_1QaXXXXXXXXXXXXX', // Replace with actual Stripe price ID
    popular: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 0,
    description: 'For teams and organizations',
    features: [
      'Team accounts',
      'API access',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
  },
];

export function PricingSection() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleCheckout = async (priceId?: string) => {
    if (!priceId) {
      // Free tier - just redirect to analyzer
      window.location.href = '/analyzer';
      return;
    }

    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          email,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg border-2 p-8 transition-all ${
                tier.popular
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {tier.popular && (
                <div className="mb-4">
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">${tier.price}</span>
                {tier.price > 0 && <span className="text-gray-600">/mo</span>}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.priceId ? (
                <>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    onClick={() => handleCheckout(tier.priceId)}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading ? 'Processing...' : tier.cta}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => handleCheckout(tier.priceId)}
                  variant={tier.popular ? 'default' : 'outline'}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            All plans include a 7-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
