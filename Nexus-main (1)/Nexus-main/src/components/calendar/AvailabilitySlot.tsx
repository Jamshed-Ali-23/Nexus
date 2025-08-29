import React from 'react';
import { Button } from '../ui/Button';

export interface AvailabilitySlotProps {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const AvailabilitySlot: React.FC<AvailabilitySlotProps> = ({
  id,
  day,
  startTime,
  endTime,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3 mb-2 border border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-medium text-gray-800">{day}</span>
          <p className="text-sm text-gray-600">
            {startTime} - {endTime}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => onEdit && onEdit(id)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded"
          >
            Edit
          </Button>
          <Button 
            onClick={() => onDelete && onDelete(id)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};