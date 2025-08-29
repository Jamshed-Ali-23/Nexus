import React, { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface TwoFactorAuthProps {
  onVerify: () => void;
  onCancel: () => void;
  email: string;
}

export const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onVerify, onCancel, email }) => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isVerified, setIsVerified] = useState(false);
  
  // Auto-focus next input when a digit is entered
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Only take the last character if multiple characters are pasted
      value = value.slice(-1);
    }
    
    if (!/^\d*$/.test(value)) {
      // Only allow digits
      return;
    }
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  // Handle backspace to go to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  
  // Countdown timer for code expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);
  
  // Mock verification
  const handleVerify = () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setIsVerifying(true);
    setError(null);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // For demo purposes, any code "123456" is valid
      if (fullCode === '123456') {
        setIsVerified(true);
        setTimeout(() => {
          onVerify();
        }, 1000);
      } else {
        setError('Invalid verification code');
        setIsVerifying(false);
      }
    }, 1500);
  };
  
  // Resend code
  const handleResend = () => {
    setTimeLeft(30);
    setError(null);
    // Mock sending a new code
    // In a real app, this would call an API
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
          {isVerified ? (
            <Check size={32} className="text-primary-600" />
          ) : (
            <Shield size={32} className="text-primary-600" />
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-center mb-2">
        {isVerified ? 'Verified Successfully' : 'Two-Factor Authentication'}
      </h3>
      
      {!isVerified && (
        <>
          <p className="text-gray-600 text-center mb-6">
            We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="flex justify-center space-x-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleVerify} 
              isLoading={isVerifying}
              disabled={code.some(digit => !digit) || isVerifying}
              fullWidth
            >
              Verify
            </Button>
            
            <div className="flex justify-between items-center">
              <button 
                type="button" 
                onClick={handleResend}
                disabled={timeLeft > 0}
                className={`text-sm ${timeLeft > 0 ? 'text-gray-400' : 'text-primary-600 hover:text-primary-700'}`}
              >
                Resend code {timeLeft > 0 && `(${timeLeft}s)`}
              </button>
              
              <button 
                type="button" 
                onClick={onCancel}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};