import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ResponsiveCard, ResponsiveCardHeader, ResponsiveCardContent } from '../common/ResponsiveCard';

interface DashboardWidgetProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  subtitle,
  icon,
  action,
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  // On mobile, all widgets take full width
  // On tablet, limit max column span to 2
  const actualColSpan = isMobile ? 1 : isTablet ? Math.min(colSpan, 2) : colSpan;
  
  // Generate grid column span class
  const colSpanClass = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
  }[actualColSpan];
  
  // Generate grid row span class
  const rowSpanClass = {
    1: 'row-span-1',
    2: 'row-span-2',
  }[rowSpan];
  
  return (
    <ResponsiveCard 
      className={`${colSpanClass} ${rowSpanClass} ${className}`}
      fullWidth
    >
      <ResponsiveCardHeader 
        title={title}
        subtitle={subtitle}
        icon={icon}
        action={action}
      />
      <ResponsiveCardContent>
        {children}
      </ResponsiveCardContent>
    </ResponsiveCard>
  );
};

interface ResponsiveDashboardProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({
  children,
  className = '',
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  // Adjust grid columns based on screen size
  const gridColsClass = isMobile 
    ? 'grid-cols-1' 
    : isTablet 
      ? 'grid-cols-2' 
      : 'grid-cols-4';
  
  return (
    <div 
      className={`
        grid 
        ${gridColsClass} 
        gap-4 
        auto-rows-min 
        ${className}
      `}
    >
      {children}
    </div>
  );
};