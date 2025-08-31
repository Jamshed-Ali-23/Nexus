import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Clock, User } from 'lucide-react';

interface CallItem {
  id: string;
  title: string;
  participantName: string;
  participantRole: string;
  scheduledTime: string;
  status: 'scheduled' | 'live' | 'completed';
}

const initialCalls: CallItem[] = [
  {
    id: '1',
    title: 'Investment Discussion',
    participantName: 'John Smith',
    participantRole: 'Investor',
    scheduledTime: '2023-06-15 14:00',
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Pitch Review',
    participantName: 'Sarah Johnson',
    participantRole: 'Entrepreneur',
    scheduledTime: '2023-06-14 10:30',
    status: 'live',
  },
  {
    id: '3',
    title: 'Follow-up Meeting',
    participantName: 'Michael Brown',
    participantRole: 'Investor',
    scheduledTime: '2023-06-10 15:45',
    status: 'completed',
  },
];

const VideoCallListPage: React.FC = () => {
  const [calls] = useState<CallItem[]>(initialCalls);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'live' | 'completed'>('all');

  const filteredCalls = filter === 'all' 
    ? calls 
    : calls.filter(call => call.status === filter);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Video Calls</h1>
      
      {/* Filters */}
      <div className="flex mb-6 space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('scheduled')}
          className={`px-4 py-2 rounded-md ${filter === 'scheduled' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Scheduled
        </button>
        <button
          onClick={() => setFilter('live')}
          className={`px-4 py-2 rounded-md ${filter === 'live' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Live
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Completed
        </button>
      </div>
      
      {/* Call List */}
      <div className="space-y-4">
        {filteredCalls.map(call => (
          <div key={call.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Video size={18} className="mr-2" />
                  {call.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <User size={16} className="mr-2" />
                  {call.participantName} ({call.participantRole})
                </p>
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Clock size={16} className="mr-2" />
                  {call.scheduledTime}
                </p>
              </div>
              <div className={`${getStatusBadgeClass(call.status)} text-xs font-medium px-2.5 py-0.5 rounded-full uppercase`}>
                {call.status}
              </div>
            </div>
            
            <div className="mt-4">
              {call.status === 'scheduled' && (
                <Link 
                  to={`/video/call/${call.id}`}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700"
                >
                  Join When Ready
                </Link>
              )}
              
              {call.status === 'live' && (
                <Link 
                  to={`/video/call/${call.id}`}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                >
                  Join Now
                </Link>
              )}
              
              {call.status === 'completed' && (
                <button 
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200"
                  onClick={() => alert('This would show the call recording or summary')}
                >
                  View Summary
                </button>
              )}
            </div>
          </div>
        ))}
        
        {filteredCalls.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No video calls found matching the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallListPage;