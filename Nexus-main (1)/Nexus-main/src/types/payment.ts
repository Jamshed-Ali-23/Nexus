export interface Transaction {
  id: string;
  amount: number;
  senderId: string;
  receiverId: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'deposit' | 'withdraw' | 'transfer' | 'investment';
  timestamp: string;
  description?: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface PaymentFormData {
  amount: number;
  receiverId?: string;
  description?: string;
}