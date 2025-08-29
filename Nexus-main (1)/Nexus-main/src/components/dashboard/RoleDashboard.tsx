import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EntrepreneurDashboard } from '../../pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from '../../pages/dashboard/InvestorDashboard';

/**
 * A smart component that renders the appropriate dashboard based on user role
 * This allows for a single route to handle both user types
 */
export const RoleDashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    // If no user is logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case 'entrepreneur':
      return <EntrepreneurDashboard />;
    case 'investor':
      return <InvestorDashboard />;
    default:
      // Fallback for any unexpected role
      return <Navigate to="/login" replace />;
  }
};