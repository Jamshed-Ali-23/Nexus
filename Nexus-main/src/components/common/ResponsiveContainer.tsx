import React from 'react';

type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: BreakpointSize | 'full';
  padding?: string;
  centerContent?: boolean;
}

/**
 * A responsive container component that adapts to different screen sizes
 * Provides consistent padding and max-width constraints across the application
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'px-4 sm:px-6 md:px-8',
  centerContent = true,
}) => {
  // Map maxWidth prop to Tailwind CSS classes
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const containerClasses = [
    padding,
    maxWidth !== 'full' ? maxWidthClasses[maxWidth] : '',
    centerContent ? 'mx-auto' : '',
    className,
  ].filter(Boolean).join(' ');

  return <div className={containerClasses}>{children}</div>;
};

/**
 * A responsive grid component that adapts to different screen sizes
 * Provides a consistent grid layout with configurable columns
 */
interface ResponsiveGridProps {
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

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { default: 1, sm: 2, lg: 3 },
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

/**
 * A component that shows different content based on screen size
 */
interface ResponsiveShowProps {
  children: React.ReactNode;
  showOnMobile?: boolean;
  showOnTablet?: boolean;
  showOnDesktop?: boolean;
  className?: string;
}

export const ResponsiveShow: React.FC<ResponsiveShowProps> = ({
  children,
  showOnMobile = true,
  showOnTablet = true,
  showOnDesktop = true,
  className = '',
}) => {
  const visibilityClasses = [
    !showOnMobile && 'hidden',
    !showOnTablet && 'sm:hidden md:hidden',
    !showOnDesktop && 'lg:hidden xl:hidden',
    showOnMobile && 'block',
    showOnTablet && 'sm:block md:block',
    showOnDesktop && 'lg:block xl:block',
  ].filter(Boolean).join(' ');

  return <div className={`${visibilityClasses} ${className}`}>{children}</div>;
};