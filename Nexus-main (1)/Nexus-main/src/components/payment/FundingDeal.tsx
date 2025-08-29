import React, { useState } from 'react';
import { usePayment } from '../../context/PaymentContext';
import { PaymentFormData } from '../../types/payment';
import { Entrepreneur } from '../../types/index';

interface FundingDealProps {
  entrepreneur: Entrepreneur;
  onSuccess?: () => void;
}

export const FundingDeal: React.FC<FundingDealProps> = ({ entrepreneur, onSuccess }) => {
  const { fundDeal, isLoading, wallet } = usePayment();
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!wallet || wallet.balance < amountValue) {
      setError('Insufficient funds in your wallet');
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      const amountValue = parseFloat(amount);
      await fundDeal({
        amount: amountValue,
        receiverId: entrepreneur.id,
        description: description || `Investment in ${entrepreneur.startupName}`
      });

      // Reset form
      setAmount('');
      setDescription('');
      setShowConfirmation(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError((error as Error).message || 'Transaction failed');
      setShowConfirmation(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Fund {entrepreneur.startupName}</h2>
      
      {showConfirmation ? (
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Confirm Investment</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>You are about to invest <strong>${parseFloat(amount).toFixed(2)}</strong> in {entrepreneur.startupName}.</p>
                  <p className="mt-1">This action cannot be undone. Are you sure you want to proceed?</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isLoading ? 'Processing...' : 'Confirm Investment'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Investment Amount (USD)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Investment Note (Optional)
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Add a note about this investment"
            />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-700">Startup Details</h4>
            <div className="mt-2 text-sm text-gray-600">
              <p><span className="font-medium">Startup:</span> {entrepreneur.startupName}</p>
              <p><span className="font-medium">Founder:</span> {entrepreneur.name}</p>
              <p><span className="font-medium">Funding Needed:</span> {entrepreneur.fundingNeeded}</p>
              <p><span className="font-medium">Industry:</span> {entrepreneur.industry}</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isLoading ? 'Processing...' : 'Invest Now'}
          </button>
        </form>
      )}
    </div>
  );
};