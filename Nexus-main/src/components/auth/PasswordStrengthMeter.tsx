import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

type StrengthLevel = 'weak' | 'medium' | 'strong' | 'very-strong';

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const [strength, setStrength] = useState<StrengthLevel>('weak');
  const [score, setScore] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    // Check requirements
    const hasLength = password.length >= 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const updatedRequirements = {
      length: hasLength,
      lowercase: hasLowercase,
      uppercase: hasUppercase,
      number: hasNumber,
      special: hasSpecial
    };
    
    setRequirements(updatedRequirements);
    
    // Calculate score (0-4)
    let newScore = 0;
    if (hasLength) newScore++;
    if (hasLowercase && hasUppercase) newScore++;
    if (hasNumber) newScore++;
    if (hasSpecial) newScore++;
    
    setScore(newScore);
    
    // Set strength level
    if (password.length === 0) {
      setStrength('weak');
    } else if (newScore <= 1) {
      setStrength('weak');
    } else if (newScore === 2) {
      setStrength('medium');
    } else if (newScore === 3) {
      setStrength('strong');
    } else {
      setStrength('very-strong');
    }
  }, [password]);

  const getColor = () => {
    switch (strength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      case 'very-strong': return 'bg-green-600';
      default: return 'bg-gray-200';
    }
  };

  const getLabel = () => {
    if (password.length === 0) return '';
    return strength.charAt(0).toUpperCase() + strength.slice(1).replace('-', ' ');
  };

  return (
    <div className="mt-2 space-y-2">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getColor()}`} 
          style={{ width: `${(score / 4) * 100}%` }}
        />
      </div>
      
      {/* Strength label */}
      {password.length > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">Password strength:</span>
          <span className={`font-medium ${
            strength === 'weak' ? 'text-red-500' : 
            strength === 'medium' ? 'text-yellow-500' : 
            'text-green-600'
          }`}>
            {getLabel()}
          </span>
        </div>
      )}
      
      {/* Requirements */}
      <div className="text-sm space-y-1 mt-2">
        <div className="flex items-center">
          {requirements.length ? 
            <Check size={16} className="text-green-500 mr-2" /> : 
            <X size={16} className="text-red-500 mr-2" />
          }
          <span>At least 8 characters</span>
        </div>
        <div className="flex items-center">
          {requirements.lowercase && requirements.uppercase ? 
            <Check size={16} className="text-green-500 mr-2" /> : 
            <X size={16} className="text-red-500 mr-2" />
          }
          <span>Mix of uppercase & lowercase letters</span>
        </div>
        <div className="flex items-center">
          {requirements.number ? 
            <Check size={16} className="text-green-500 mr-2" /> : 
            <X size={16} className="text-red-500 mr-2" />
          }
          <span>At least one number</span>
        </div>
        <div className="flex items-center">
          {requirements.special ? 
            <Check size={16} className="text-green-500 mr-2" /> : 
            <X size={16} className="text-red-500 mr-2" />
          }
          <span>At least one special character</span>
        </div>
      </div>
    </div>
  );
};