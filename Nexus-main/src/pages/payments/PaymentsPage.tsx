import React, { useState } from 'react';
import { PaymentCard } from '../../components/payment/PaymentCard';
import { TransactionHistory } from '../../components/payment/TransactionHistory';
import { WalletBalance } from '../../components/payment/WalletBalance';
import { usePayment } from '../../context/PaymentContext';

export const PaymentsPage: React.FC = () => {
  const { wallet, recentTransactions } = usePayment();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payments & Wallet</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Wallet info */}
        <div className="lg:col-span-1 space-y-6">
          <WalletBalance />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-col space-y-2">
              <button 
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => setActiveTab('deposit')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Deposit Funds
              </button>
              <button 
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => setActiveTab('withdraw')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
                Withdraw Funds
              </button>
              <button 
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => setActiveTab('transfer')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
                  <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
                Transfer Funds
              </button>
            </div>
          </div>
        </div>
        
        {/* Middle column - Payment form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 px-4 text-center text-sm font-medium ${activeTab === 'deposit' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('deposit')}
              >
                Deposit
              </button>
              <button
                className={`flex-1 py-4 px-4 text-center text-sm font-medium ${activeTab === 'withdraw' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('withdraw')}
              >
                Withdraw
              </button>
              <button
                className={`flex-1 py-4 px-4 text-center text-sm font-medium ${activeTab === 'transfer' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('transfer')}
              >
                Transfer
              </button>
            </div>
            <div className="p-6">
              <PaymentCard type={activeTab} />
            </div>
          </div>
        </div>
        
        {/* Right column - Transaction history */}
        <div className="lg:col-span-1">
          <TransactionHistory 
            transactions={wallet?.transactions || recentTransactions} 
            showPagination={false}
          />
        </div>
      </div>
    </div>
  );
};