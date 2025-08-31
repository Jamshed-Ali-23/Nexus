import React, { useState } from 'react';
import { usePayment } from '../../context/PaymentContext';
import { PaymentFormData } from '../../types/payment';

interface PaymentCardProps {
  type: 'deposit' | 'withdraw' | 'transfer';
  receiverId?: string;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ type, receiverId }) => {
  const { deposit, withdraw, transfer, isLoading } = usePayment();
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    const paymentData: PaymentFormData = {
      amount: amountValue,
      description,
    };

    if (type === 'transfer' && receiverId) {
      paymentData.receiverId = receiverId;
    }

    try {
      if (type === 'deposit') {
        await deposit(paymentData);
      } else if (type === 'withdraw') {
        await withdraw(paymentData);
      } else if (type === 'transfer') {
        await transfer(paymentData);
      }

      // Reset form
      setAmount('');
      setDescription('');
    } catch (error) {
      setError((error as Error).message || 'Transaction failed');
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'deposit':
        return 'Deposit Funds';
      case 'withdraw':
        return 'Withdraw Funds';
      case 'transfer':
        return 'Transfer Funds';
      default:
        return 'Payment';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{getTitle()}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (USD)
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
            Description (Optional)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="What's this payment for?"
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400' : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}`}
        >
          {isLoading ? 'Processing...' : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </button>
      </form>
    </div>
  );
};