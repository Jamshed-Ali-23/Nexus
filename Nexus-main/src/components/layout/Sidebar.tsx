import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { RoleBasedNavigation } from './RoleBasedNavigation';

// Sidebar component now uses RoleBasedNavigation for dynamic navigation

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="flex-1 py-4 overflow-y-auto">
          <div className="px-3">
            {/* Use the role-based navigation component */}
            <RoleBasedNavigation />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-600">Need assistance?</p>
            <h4 className="text-sm font-medium text-gray-900 mt-1">Contact Support</h4>
            <a 
              href="mailto:support@businessnexus.com" 
              className="mt-2 inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-500"
            >
              support@businessnexus.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};