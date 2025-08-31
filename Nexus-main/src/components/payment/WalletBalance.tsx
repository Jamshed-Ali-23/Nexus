import React from 'react';
import { usePayment } from '../../context/PaymentContext';

export const WalletBalance: React.FC = () => {
  const { wallet, isLoading } = usePayment();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Wallet not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Available Balance</h3>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">${wallet.balance.toFixed(2)}</span>
        <span className="ml-2 text-sm text-gray-500">{wallet.currency}</span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button 
          className="px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={() => window.location.href = '/payments'}
        >
          Manage Funds
        </button>
      </div>
    </div>
  );
};