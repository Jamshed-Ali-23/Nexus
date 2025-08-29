import React from 'react';
import { Button } from '../ui/Button';

export interface MeetingRequestProps {
  id: string;
  title: string;
  requester: string;
  requesterRole: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}

export const MeetingRequest: React.FC<MeetingRequestProps> = ({
  id,
  title,
  requester,
  requesterRole,
  date,
  time,
  status,
  onAccept,
  onDecline
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            Requested by {requester} ({requesterRole})
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {date} at {time}
          </p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full uppercase">
          {status}
        </div>
      </div>
      
      {status === 'pending' && (
        <div className="mt-4 flex space-x-2">
          <Button 
            onClick={() => onAccept && onAccept(id)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
          >
            Accept
          </Button>
          <Button 
            onClick={() => onDecline && onDecline(id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  );
};