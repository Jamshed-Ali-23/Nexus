import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Rocket, TrendingUp, Users, PieChart } from 'lucide-react';

export const RoleBasedHeader: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Entrepreneur-specific header content
  const EntrepreneurHeader = () => (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Rocket className="mr-2 text-primary-600" size={24} />
          Startup Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your startup, track metrics, and connect with investors
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center space-x-3">
        <Badge variant="success" className="flex items-center">
          <TrendingUp size={14} className="mr-1" />
          Fundraising Mode
        </Badge>
        <Button size="sm" variant="outline">
          Update Pitch Deck
        </Button>
        <Button size="sm" variant="primary">
          Launch Campaign
        </Button>
      </div>
    </div>
  );
  
  // Investor-specific header content
  const InvestorHeader = () => (
    <div className="flex flex-col md:flex-row md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <PieChart className="mr-2 text-primary-600" size={24} />
          Investor Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Discover promising startups and manage your investment portfolio
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center space-x-3">
        <Badge variant="info" className="flex items-center">
          <Users size={14} className="mr-1" />
          10 New Startups
        </Badge>
        <Button size="sm" variant="outline">
          Portfolio Analytics
        </Button>
        <Button size="sm" variant="primary">
          Investment Opportunities
        </Button>
      </div>
    </div>
  );
  
  // Render the appropriate header based on user role
  return user.role === 'entrepreneur' ? <EntrepreneurHeader /> : <InvestorHeader />;
};