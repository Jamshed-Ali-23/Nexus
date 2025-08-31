import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export type DocumentStatusType = 'draft' | 'in_review' | 'signed';

interface DocumentStatusProps {
  status: DocumentStatusType;
  className?: string;
}

export const DocumentStatus: React.FC<DocumentStatusProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          icon: <Clock className="h-4 w-4 text-gray-500" />
        };
      case 'in_review':
        return {
          label: 'In Review',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: <AlertCircle className="h-4 w-4 text-yellow-500" />
        };
      case 'signed':
        return {
          label: 'Signed',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: <CheckCircle className="h-4 w-4 text-green-500" />
        };
      default:
        return {
          label: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          icon: <Clock className="h-4 w-4 text-gray-500" />
        };
    }
  };

  const { label, bgColor, textColor, icon } = getStatusConfig();

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor} ${className}`}>
      <span className="mr-1">{icon}</span>
      {label}
    </div>
  );
};

export default DocumentStatus;