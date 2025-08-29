import { Wallet, Transaction } from '../types/payment';

// Mock transactions data
export const transactions: Transaction[] = [
  {
    id: 't1',
    amount: 5000,
    senderId: 'system',
    receiverId: 'e1',
    status: 'completed',
    type: 'deposit',
    timestamp: '2023-06-15T10:30:00Z',
    description: 'Initial deposit'
  },
  {
    id: 't2',
    amount: 10000,
    senderId: 'system',
    receiverId: 'i1',
    status: 'completed',
    type: 'deposit',
    timestamp: '2023-06-14T09:15:00Z',
    description: 'Initial deposit'
  },
  {
    id: 't3',
    amount: 2500,
    senderId: 'i1',
    receiverId: 'e1',
    status: 'completed',
    type: 'investment',
    timestamp: '2023-06-16T14:45:00Z',
    description: 'Seed investment'
  },
  {
    id: 't4',
    amount: 1000,
    senderId: 'e1',
    receiverId: 'external',
    status: 'completed',
    type: 'withdraw',
    timestamp: '2023-06-17T16:20:00Z',
    description: 'Operational expenses'
  },
  {
    id: 't5',
    amount: 3000,
    senderId: 'i1',
    receiverId: 'e2',
    status: 'pending',
    type: 'investment',
    timestamp: '2023-06-18T11:10:00Z',
    description: 'Series A investment'
  }
];

// Mock wallets data
export const wallets: Wallet[] = [
  {
    id: 'w1',
    userId: 'e1',
    balance: 6500,
    currency: 'USD',
    transactions: transactions.filter(t => t.senderId === 'e1' || t.receiverId === 'e1')
  },
  {
    id: 'w2',
    userId: 'i1',
    balance: 7500,
    currency: 'USD',
    transactions: transactions.filter(t => t.senderId === 'i1' || t.receiverId === 'i1')
  },
  {
    id: 'w3',
    userId: 'e2',
    balance: 0,
    currency: 'USD',
    transactions: transactions.filter(t => t.senderId === 'e2' || t.receiverId === 'e2')
  },
  {
    id: 'w4',
    userId: 'i2',
    balance: 15000,
    currency: 'USD',
    transactions: []
  }
];

// Helper function to get wallet by user ID
export const getWalletByUserId = (userId: string): Wallet | undefined => {
  return wallets.find(wallet => wallet.userId === userId);
};

// Helper function to add a new transaction
export const addTransaction = (transaction: Transaction): void => {
  transactions.push(transaction);
  
  // Update wallet balances
  if (transaction.status === 'completed') {
    const senderWallet = wallets.find(w => w.userId === transaction.senderId);
    const receiverWallet = wallets.find(w => w.userId === transaction.receiverId);
    
    if (senderWallet && transaction.senderId !== 'system') {
      senderWallet.balance -= transaction.amount;
      senderWallet.transactions.push(transaction);
    }
    
    if (receiverWallet && transaction.receiverId !== 'external') {
      receiverWallet.balance += transaction.amount;
      receiverWallet.transactions.push(transaction);
    }
  }
};