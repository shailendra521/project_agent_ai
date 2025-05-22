import React, { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  price: string;
  credits: string;
  features: string[];
  current: boolean;
};

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
};

export default function Billing() {
  const [plans] = useState<Plan[]>([
    {
      id: 'free',
      name: 'Free Plan',
      price: '$0',
      credits: '100K Credits/Year',
      features: [
        'Access to Knowledge Base',
        'Create 1 AI Agent',
        'Up to 10 Employees',
        'Basic Support',
      ],
      current: true,
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: '$50',
      credits: '1M Credits/Year',
      features: [
        'Unlimited Agents',
        'Unlimited Employees',
        'API Access',
        'Priority Support',
        'Advanced Analytics',
        'Custom Integrations',
      ],
      current: false,
    },
  ]);

  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2024-001',
      date: '2024-03-01',
      amount: '$50.00',
      status: 'paid',
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-01',
      amount: '$50.00',
      status: 'paid',
    },
    {
      id: 'INV-2024-003',
      date: '2024-01-01',
      amount: '$50.00',
      status: 'failed',
    },
  ]);

  const [showUpdateCard, setShowUpdateCard] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });

  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update card:', cardDetails);
    setShowUpdateCard(false);
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg border-2 p-6 ${
                  plan.current
                    ? 'border-hrone-600 bg-hrone-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{plan.price}</p>
                    <p className="mt-1 text-sm text-gray-500">{plan.credits}</p>
                  </div>
                  {plan.current && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-hrone-100 text-hrone-800">
                      Current Plan
                    </span>
                  )}
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-hrone-600 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-6 w-full px-4 py-2 rounded-lg font-medium ${
                    plan.current
                      ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                      : 'bg-hrone-600 text-white hover:bg-hrone-700'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
            <button
              onClick={() => setShowUpdateCard(true)}
              className="text-hrone-600 hover:text-hrone-700 font-medium"
            >
              Update
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Visa ending in 4242</p>
              <p className="text-sm text-gray-500">Expires 12/24</p>
            </div>
          </div>

          {/* Update Card Modal */}
          {showUpdateCard && (
            <div className="mt-6 p-6 border rounded-lg bg-gray-50">
              <form onSubmit={handleUpdateCard} className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-hrone-500 focus:ring-hrone-500"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowUpdateCard(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-hrone-600 text-white rounded-lg hover:bg-hrone-700"
                  >
                    Update Card
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Billing History</h2>
          <div className="mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {invoice.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Usage Statistics</h2>
          <div className="mt-4">
            <div className="bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-hrone-600 h-2 rounded-full"
                style={{ width: '45%' }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
              <span>45,000 credits used</span>
              <span>100,000 credits total</span>
            </div>
          </div>
          {/* Usage Warning */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
            <p className="text-sm text-yellow-700">
              You've used 45% of your credits this year. At your current usage rate, you'll reach your
              limit in approximately 7 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}