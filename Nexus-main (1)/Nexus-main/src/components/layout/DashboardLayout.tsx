import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { RoleBasedHeader } from './RoleBasedHeader';

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <Navbar />
      
      <main className="flex-1 overflow-y-auto pt-16 w-full">
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="mb-6">
            <RoleBasedHeader />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};