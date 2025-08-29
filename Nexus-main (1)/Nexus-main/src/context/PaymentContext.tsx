import React, { createContext, useState, useContext, useEffect } from 'react';
import { Wallet, Transaction, PaymentFormData } from '../types/payment';
import { useAuth } from './AuthContext';
import { getWalletByUserId, addTransaction } from '../data/wallets';
import toast from 'react-hot-toast';

interface PaymentContextType {
  wallet: Wallet | null;
  isLoading: boolean;
  deposit: (data: PaymentFormData) => Promise<void>;
  withdraw: (data: PaymentFormData) => Promise<void>;
  transfer: (data: PaymentFormData) => Promise<void>;
  fundDeal: (data: PaymentFormData) => Promise<void>;
  recentTransactions: Transaction[];
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  // Load wallet data when user changes
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const userWallet = getWalletByUserId(user.id);
        if (userWallet) {
          setWallet(userWallet);
          // Sort transactions by timestamp (newest first)
          const sortedTransactions = [...userWallet.transactions].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setRecentTransactions(sortedTransactions.slice(0, 5)); // Get 5 most recent
        } else {
          // Create empty wallet if none exists
          const newWallet: Wallet = {
            id: `w${Date.now()}`,
            userId: user.id,
            balance: 0,
            currency: 'USD',
            transactions: []
          };
          setWallet(newWallet);
          setRecentTransactions([]);
        }
        setIsLoading(false);
      }, 800);
    } else {
      setWallet(null);
      setRecentTransactions([]);
      setIsLoading(false);
    }
  }, [user]);

  // Deposit function
  const deposit = async (data: PaymentFormData): Promise<void> => {
    if (!user || !wallet) return;
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        amount: data.amount,
        senderId: 'system',
        receiverId: user.id,
        status: 'completed',
        type: 'deposit',
        timestamp: new Date().toISOString(),
        description: data.description || 'Deposit'
      };
      
      addTransaction(newTransaction);
      
      // Update local state
      setWallet(prev => prev ? {
        ...prev,
        balance: prev.balance + data.amount,
        transactions: [newTransaction, ...prev.transactions]
      } : null);
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 5));
      
      toast.success(`Successfully deposited $${data.amount}`);
    } catch (error) {
      toast.error('Failed to process deposit');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Withdraw function
  const withdraw = async (data: PaymentFormData): Promise<void> => {
    if (!user || !wallet) return;
    
    if (wallet.balance < data.amount) {
      toast.error('Insufficient funds');
      throw new Error('Insufficient funds');
    }
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        amount: data.amount,
        senderId: user.id,
        receiverId: 'external',
        status: 'completed',
        type: 'withdraw',
        timestamp: new Date().toISOString(),
        description: data.description || 'Withdrawal'
      };
      
      addTransaction(newTransaction);
      
      // Update local state
      setWallet(prev => prev ? {
        ...prev,
        balance: prev.balance - data.amount,
        transactions: [newTransaction, ...prev.transactions]
      } : null);
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 5));
      
      toast.success(`Successfully withdrew $${data.amount}`);
    } catch (error) {
      toast.error('Failed to process withdrawal');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Transfer function
  const transfer = async (data: PaymentFormData): Promise<void> => {
    if (!user || !wallet || !data.receiverId) return;
    
    if (wallet.balance < data.amount) {
      toast.error('Insufficient funds');
      throw new Error('Insufficient funds');
    }
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        amount: data.amount,
        senderId: user.id,
        receiverId: data.receiverId,
        status: 'completed',
        type: 'transfer',
        timestamp: new Date().toISOString(),
        description: data.description || 'Transfer'
      };
      
      addTransaction(newTransaction);
      
      // Update local state
      setWallet(prev => prev ? {
        ...prev,
        balance: prev.balance - data.amount,
        transactions: [newTransaction, ...prev.transactions]
      } : null);
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 5));
      
      toast.success(`Successfully transferred $${data.amount}`);
    } catch (error) {
      toast.error('Failed to process transfer');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fund deal function (investor to entrepreneur)
  const fundDeal = async (data: PaymentFormData): Promise<void> => {
    if (!user || !wallet || !data.receiverId) return;
    
    if (wallet.balance < data.amount) {
      toast.error('Insufficient funds');
      throw new Error('Insufficient funds');
    }
    
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        amount: data.amount,
        senderId: user.id,
        receiverId: data.receiverId,
        status: 'completed',
        type: 'investment',
        timestamp: new Date().toISOString(),
        description: data.description || 'Investment funding'
      };
      
      addTransaction(newTransaction);
      
      // Update local state
      setWallet(prev => prev ? {
        ...prev,
        balance: prev.balance - data.amount,
        transactions: [newTransaction, ...prev.transactions]
      } : null);
      
      setRecentTransactions(prev => [newTransaction, ...prev].slice(0, 5));
      
      toast.success(`Successfully funded $${data.amount}`);
    } catch (error) {
      toast.error('Failed to process funding');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        wallet,
        isLoading,
        deposit,
        withdraw,
        transfer,
        fundDeal,
        recentTransactions
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

// Custom hook to use the payment context
export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};