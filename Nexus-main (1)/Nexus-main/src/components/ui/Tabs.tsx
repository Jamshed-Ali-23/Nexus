import React from 'react';
import { cn } from '../../utils';

interface TabsProps {
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('tabs', className)} {...props}>
      {children}
    </div>
  );
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (value: string) => void;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  className,
  active,
  disabled,
  onClick,
  children,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(value);
    }
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'bg-white text-primary-700 shadow-sm'
          : 'text-gray-600 hover:text-gray-900',
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  active,
  className,
  children,
  ...props
}) => {
  if (!active) return null;

  return (
    <div
      className={cn(
        'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};