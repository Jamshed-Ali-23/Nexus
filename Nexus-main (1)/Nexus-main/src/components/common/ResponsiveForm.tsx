import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface ResponsiveFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const ResponsiveForm: React.FC<ResponsiveFormProps> = ({
  children,
  onSubmit,
  className = '',
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

interface ResponsiveFormGroupProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'column';
}

export const ResponsiveFormGroup: React.FC<ResponsiveFormGroupProps> = ({
  children,
  className = '',
  direction = 'column',
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  // Force column layout on mobile regardless of direction prop
  const layoutClass = isMobile 
    ? 'flex-col' 
    : direction === 'row' ? 'flex-row items-center' : 'flex-col';
  
  return (
    <div className={`flex mb-4 ${layoutClass} ${className}`}>
      {children}
    </div>
  );
};

interface ResponsiveFormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const ResponsiveFormLabel: React.FC<ResponsiveFormLabelProps> = ({
  htmlFor,
  children,
  className = '',
  required = false,
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <label 
      htmlFor={htmlFor} 
      className={`
        block 
        text-gray-700 
        font-medium 
        ${isMobile ? 'text-sm mb-1' : 'text-base mb-2'} 
        ${className}
      `}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

interface ResponsiveFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
  fullWidth?: boolean;
}

export const ResponsiveFormInput: React.FC<ResponsiveFormInputProps> = ({
  id,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  const widthClass = fullWidth ? 'w-full' : '';
  const sizeClass = isMobile ? 'text-sm p-2' : 'p-2.5';
  const errorClass = error ? 'border-red-500' : 'border-gray-300';
  
  return (
    <div className={widthClass}>
      <input
        id={id}
        className={`
          ${widthClass}
          ${sizeClass}
          ${errorClass}
          rounded-md
          border
          focus:ring-2
          focus:ring-primary-500
          focus:border-primary-500
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
};

interface ResponsiveFormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  error?: string;
  fullWidth?: boolean;
}

export const ResponsiveFormTextarea: React.FC<ResponsiveFormTextareaProps> = ({
  id,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  const widthClass = fullWidth ? 'w-full' : '';
  const sizeClass = isMobile ? 'text-sm p-2' : 'p-2.5';
  const errorClass = error ? 'border-red-500' : 'border-gray-300';
  
  return (
    <div className={widthClass}>
      <textarea
        id={id}
        className={`
          ${widthClass}
          ${sizeClass}
          ${errorClass}
          rounded-md
          border
          focus:ring-2
          focus:ring-primary-500
          focus:border-primary-500
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
};

interface ResponsiveFormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  fullWidth?: boolean;
}

export const ResponsiveFormSelect: React.FC<ResponsiveFormSelectProps> = ({
  id,
  options,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  const widthClass = fullWidth ? 'w-full' : '';
  const sizeClass = isMobile ? 'text-sm p-2' : 'p-2.5';
  const errorClass = error ? 'border-red-500' : 'border-gray-300';
  
  return (
    <div className={widthClass}>
      <select
        id={id}
        className={`
          ${widthClass}
          ${sizeClass}
          ${errorClass}
          rounded-md
          border
          focus:ring-2
          focus:ring-primary-500
          focus:border-primary-500
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
};

interface ResponsiveFormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const ResponsiveFormButton: React.FC<ResponsiveFormButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  // Adjust size based on mobile and size prop
  let sizeClass = '';
  if (isMobile) {
    sizeClass = size === 'sm' ? 'py-1 px-2 text-xs' : size === 'lg' ? 'py-2 px-4 text-base' : 'py-1.5 px-3 text-sm';
  } else {
    sizeClass = size === 'sm' ? 'py-1.5 px-3 text-sm' : size === 'lg' ? 'py-2.5 px-5 text-base' : 'py-2 px-4 text-sm';
  }
  
  // Set variant styles
  let variantClass = '';
  switch (variant) {
    case 'primary':
      variantClass = 'bg-primary-600 hover:bg-primary-700 text-white';
      break;
    case 'secondary':
      variantClass = 'bg-gray-600 hover:bg-gray-700 text-white';
      break;
    case 'outline':
      variantClass = 'bg-white border-gray-300 border hover:bg-gray-50 text-gray-700';
      break;
    case 'danger':
      variantClass = 'bg-red-600 hover:bg-red-700 text-white';
      break;
  }
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`
        ${sizeClass}
        ${variantClass}
        ${widthClass}
        rounded-md
        font-medium
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary-500
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};