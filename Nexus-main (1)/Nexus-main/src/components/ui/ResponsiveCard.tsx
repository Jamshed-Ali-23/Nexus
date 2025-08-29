import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

interface ResponsiveCardProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  compact?: boolean;
  expandOnMobile?: boolean;
  noPadding?: boolean;
}

/**
 * A responsive card component that adapts to different screen sizes
 * Provides a consistent card layout with optional header and footer
 */
export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  children,
  footer,
  className = '',
  compact = false,
  expandOnMobile = false,
  noPadding = false,
}) => {
  const isMobile = !useMediaQuery('(min-width: 640px)');
  
  // Determine padding classes based on props and screen size
  const getPaddingClasses = () => {
    if (noPadding) return '';
    
    if (compact) {
      return 'p-3 sm:p-4';
    }
    
    return 'p-4 sm:p-5 md:p-6';
  };
  
  // Determine card classes based on props and screen size
  const getCardClasses = () => {
    const baseClasses = [
      'bg-white',
      'rounded-lg',
      'shadow',
      'border',
      'border-gray-200',
      className
    ];
    
    if (isMobile && expandOnMobile) {
      baseClasses.push('mx-[-1rem]', 'rounded-none');
    }
    
    return baseClasses.join(' ');
  };
  
  return (
    <Card className={getCardClasses()}>
      {title && (
        <CardHeader className={compact ? 'p-3 sm:p-4' : 'p-4 sm:p-5 md:p-6'}>
          {typeof title === 'string' ? (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          ) : (
            title
          )}
        </CardHeader>
      )}
      
      <CardBody className={getPaddingClasses()}>
        {children}
      </CardBody>
      
      {footer && (
        <CardFooter className={compact ? 'p-3 sm:p-4' : 'p-4 sm:p-5 md:p-6'}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

/**
 * A responsive card grid component that adapts to different screen sizes
 */
interface ResponsiveCardGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export const ResponsiveCardGrid: React.FC<ResponsiveCardGridProps> = ({
  children,
  className = '',
  cols = { default: 1, sm: 1, md: 2, lg: 3 },
  gap = 'gap-4 md:gap-6',
}) => {
  // Generate grid column classes based on the cols prop
  const colClasses = [
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean).join(' ');

  const gridClasses = [
    'grid',
    colClasses,
    gap,
    className,
  ].filter(Boolean).join(' ');

  return <div className={gridClasses}>{children}</div>;
};