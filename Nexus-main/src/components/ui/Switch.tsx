import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`${className} relative inline-flex h-6 w-11 items-center rounded-full ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${checked ? 'bg-primary-600' : 'bg-gray-200'} transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
    >
      <span className="sr-only">{checked ? 'On' : 'Off'}</span>
      <span
        className={`${checked ? 'translate-x-5' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
      />
    </button>
  );
};