import React from 'react';
import { usePayment } from '../../context/PaymentContext';
import { Link } from 'react-router-dom';

export const WalletWidget: React.FC = () => {
  const { wallet, isLoading, recentTransactions } = usePayment();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Wallet</h3>
        <p className="text-gray-500 mb-4">No wallet information available</p>
        <Link 
          to="/payments"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Set up wallet
        </Link>
      </div>
    );
  }

  const latestTransaction = recentTransactions[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Wallet</h3>
        <Link 
          to="/payments"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Manage
        </Link>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">Available Balance</div>
        <div className="text-2xl font-bold">${wallet.balance.toFixed(2)}</div>
      </div>
      
      {latestTransaction && (
        <div className="border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500 mb-2">Latest Transaction</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">
                {latestTransaction.type.charAt(0).toUpperCase() + latestTransaction.type.slice(1)}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(latestTransaction.timestamp).toLocaleDateString()}
              </div>
            </div>
            <div className={`text-sm font-medium ${latestTransaction.senderId === wallet.userId ? 'text-red-600' : 'text-green-600'}`}>
              {latestTransaction.senderId === wallet.userId ? '-' : '+'}
              ${latestTransaction.amount.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};