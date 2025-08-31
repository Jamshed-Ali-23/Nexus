import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface RoleBasedContentProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that conditionally renders content based on user role
 * @param roles - Array of roles that can view this content
 * @param children - Content to show if user has one of the specified roles
 * @param fallback - Optional content to show if user doesn't have the required role
 */
export const RoleBasedContent: React.FC<RoleBasedContentProps> = ({ 
  roles, 
  children, 
  fallback = null 
}) => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Check if the current user's role is in the allowed roles array
  const hasAccess = roles.includes(user.role);
  
  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

/**
 * A component that only shows content to entrepreneurs
 */
export const EntrepreneurOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return <RoleBasedContent roles={['entrepreneur']} fallback={fallback}>{children}</RoleBasedContent>;
};

/**
 * A component that only shows content to investors
 */
export const InvestorOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return <RoleBasedContent roles={['investor']} fallback={fallback}>{children}</RoleBasedContent>;
};