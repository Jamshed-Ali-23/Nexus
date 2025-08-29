import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  noPadding?: boolean;
  fullWidth?: boolean;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className = '',
  compact = false,
  noPadding = false,
  fullWidth = false,
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  const paddingClass = noPadding 
    ? '' 
    : compact 
      ? isMobile ? 'p-3' : 'p-4' 
      : isMobile ? 'p-4' : 'p-6';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div 
      className={`
        bg-white 
        rounded-lg 
        shadow-sm 
        border 
        border-gray-200 
        ${paddingClass} 
        ${widthClass} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface ResponsiveCardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const ResponsiveCardHeader: React.FC<ResponsiveCardHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  className = '',
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex items-center">
        {icon && (
          <div className={`mr-3 text-primary-600 ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {icon}
          </div>
        )}
        <div>
          <h3 className={`font-semibold text-gray-900 ${isMobile ? 'text-base' : 'text-lg'}`}>
            {title}
          </h3>
          {subtitle && (
            <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

interface ResponsiveCardContentProps {
  children: React.ReactNode;
  className?: string;
  divided?: boolean;
}

export const ResponsiveCardContent: React.FC<ResponsiveCardContentProps> = ({
  children,
  className = '',
  divided = false,
}) => {
  return (
    <div 
      className={`
        ${divided ? 'border-t border-gray-200 pt-4' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface ResponsiveCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveCardFooter: React.FC<ResponsiveCardFooterProps> = ({
  children,
  className = '',
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <div 
      className={`
        border-t 
        border-gray-200 
        ${isMobile ? 'mt-3 pt-3' : 'mt-4 pt-4'} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};