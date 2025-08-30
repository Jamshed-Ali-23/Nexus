import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoCall from '../../components/video/VideoCall';
import { useAuth } from '../../context/AuthContext';

interface CallDetails {
  id: string;
  title: string;
  participantName: string;
  participantRole: string;
}

// Mock data for calls
const mockCalls: Record<string, CallDetails> = {
  '1': {
    id: '1',
    title: 'Investment Discussion',
    participantName: 'John Smith',
    participantRole: 'Investor',
  },
  '2': {
    id: '2',
    title: 'Pitch Review',
    participantName: 'Sarah Johnson',
    participantRole: 'Entrepreneur',
  },
  '3': {
    id: '3',
    title: 'Follow-up Meeting',
    participantName: 'Michael Brown',
    participantRole: 'Investor',
  },
};

const VideoCallPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);
  // const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState(user?.name || '');
  const [showNameInput, setShowNameInput] = useState(!user?.name);
  const [isInCall, setIsInCall] = useState(false);

  useEffect(() => {
    // Simulate API call to get call details
    const fetchCallDetails = () => {
      setTimeout(() => {
        if (id && mockCalls[id]) {
          setCallDetails(mockCalls[id]);
          setIsConnecting(false);
        } else {
          setError('Call not found or has ended');
          setIsConnecting(false);
        }
      }, 1500); // Simulate network delay
    };

    fetchCallDetails();
  }, [id]);

  const handleEndCall = () => {
    // In a real app, this would disconnect from the call
    navigate('/video');
  };

  if (showNameInput) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Join the Call</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your name"
            />
          </div>
          <button
            onClick={() => {
              if (participantName.trim()) {
                setShowNameInput(false);
                setIsInCall(true);
              }
            }}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Join Call
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate('/video')}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Back to Video Calls
          </button>
        </div>
      </div>
    );
  }

  if (!callDetails) {
    return null;
  }

  if (isInCall) {
    return (
      <div className="min-h-screen bg-gray-100">
        {callDetails && (
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{callDetails.title}</h1>
              <button
                onClick={() => setIsInCall(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Leave Call
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-700 mb-4">
                Call with {callDetails.participantName} ({callDetails.participantRole})
              </p>
              <div className="flex space-x-4">
                <button className="bg-gray-200 p-3 rounded-full hover:bg-gray-300">
                  <span className="sr-only">Mute</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
                <button className="bg-gray-200 p-3 rounded-full hover:bg-gray-300">
                  <span className="sr-only">Video</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700">
                  <span className="sr-only">End Call</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{callDetails.title}</h1>
        <p className="text-gray-600">
          Call with {callDetails.participantName} ({callDetails.participantRole})
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 h-[calc(100vh-200px)]">
        <VideoCall
          callId={callDetails.id}
          participantName={callDetails.participantName}
          onEndCall={handleEndCall}
        />
      </div>
    </div>
  );
};

export default VideoCallPage;