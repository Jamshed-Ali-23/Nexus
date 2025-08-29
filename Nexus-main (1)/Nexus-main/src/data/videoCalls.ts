import { v4 as uuidv4 } from 'uuid';

export interface VideoCall {
  id: string;
  title: string;
  description?: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  participants: string[];
  hostEmail: string;
  recordingUrl?: string;
  transcriptUrl?: string;
  meetingNotes?: string;
}

const videoCalls: VideoCall[] = [
  {
    id: uuidv4(),
    title: 'Initial Pitch Meeting',
    description: 'TechWave will present their business model and product roadmap',
    scheduledStart: '2023-06-15T10:00:00',
    scheduledEnd: '2023-06-15T11:30:00',
    status: 'scheduled',
    participants: ['michael@vcinnovate.com', 'sarah@techwave.io', 'team@techwave.io'],
    hostEmail: 'sarah@techwave.io'
  },
  {
    id: uuidv4(),
    title: 'Due Diligence Discussion',
    description: 'Review financial projections and market analysis',
    scheduledStart: '2023-06-17T14:00:00',
    scheduledEnd: '2023-06-17T15:30:00',
    status: 'scheduled',
    participants: ['michael@vcinnovate.com', 'sarah@techwave.io', 'finance@vcinnovate.com'],
    hostEmail: 'michael@vcinnovate.com'
  },
  {
    id: uuidv4(),
    title: 'Live Product Demo',
    description: 'Demonstration of the MVP and key features',
    scheduledStart: '2023-06-10T11:00:00',
    scheduledEnd: '2023-06-10T12:00:00',
    actualStart: '2023-06-10T11:05:00',
    status: 'live',
    participants: ['michael@vcinnovate.com', 'sarah@techwave.io', 'product@techwave.io'],
    hostEmail: 'sarah@techwave.io'
  },
  {
    id: uuidv4(),
    title: 'Technical Architecture Review',
    description: 'Deep dive into the technical stack and architecture',
    scheduledStart: '2023-06-05T13:00:00',
    scheduledEnd: '2023-06-05T15:00:00',
    actualStart: '2023-06-05T13:00:00',
    actualEnd: '2023-06-05T14:45:00',
    status: 'completed',
    participants: ['michael@vcinnovate.com', 'sarah@techwave.io', 'tech@vcinnovate.com', 'cto@techwave.io'],
    hostEmail: 'cto@techwave.io',
    recordingUrl: 'https://meetings.example.com/recordings/tech-review',
    transcriptUrl: 'https://meetings.example.com/transcripts/tech-review',
    meetingNotes: 'The team presented their microservices architecture and scaling strategy. The VCs were impressed with the approach to handling high traffic loads.'
  },
  {
    id: uuidv4(),
    title: 'Market Strategy Discussion',
    description: 'Review go-to-market strategy and customer acquisition plans',
    scheduledStart: '2023-06-07T09:00:00',
    scheduledEnd: '2023-06-07T10:30:00',
    actualStart: '2023-06-07T09:00:00',
    actualEnd: '2023-06-07T10:15:00',
    status: 'completed',
    participants: ['michael@vcinnovate.com', 'sarah@techwave.io', 'marketing@techwave.io'],
    hostEmail: 'sarah@techwave.io',
    recordingUrl: 'https://meetings.example.com/recordings/market-strategy',
    meetingNotes: 'The marketing team presented their customer acquisition strategy. Michael suggested focusing more on enterprise clients initially.'
  }
];

export const getAllCalls = (userEmail: string): VideoCall[] => {
  return videoCalls
    .filter(call => call.participants.includes(userEmail))
    .sort((a, b) => new Date(b.scheduledStart).getTime() - new Date(a.scheduledStart).getTime());
};

export const getScheduledCalls = (userEmail: string): VideoCall[] => {
  return videoCalls
    .filter(call => 
      call.participants.includes(userEmail) && 
      call.status === 'scheduled'
    )
    .sort((a, b) => new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime());
};

export const getLiveCalls = (userEmail: string): VideoCall[] => {
  return videoCalls
    .filter(call => 
      call.participants.includes(userEmail) && 
      call.status === 'live'
    );
};

export const getCompletedCalls = (userEmail: string): VideoCall[] => {
  return videoCalls
    .filter(call => 
      call.participants.includes(userEmail) && 
      call.status === 'completed'
    )
    .sort((a, b) => new Date(b.scheduledStart).getTime() - new Date(a.scheduledStart).getTime());
};

export const getCallById = (id: string): VideoCall | undefined => {
  return videoCalls.find(call => call.id === id);
};

export const addCall = (call: Omit<VideoCall, 'id'>): VideoCall => {
  const newCall = { ...call, id: uuidv4() };
  videoCalls.push(newCall);
  return newCall;
};

export const updateCall = (id: string, updates: Partial<VideoCall>): VideoCall | null => {
  const callIndex = videoCalls.findIndex(call => call.id === id);
  if (callIndex === -1) return null;
  
  videoCalls[callIndex] = { ...videoCalls[callIndex], ...updates };
  return videoCalls[callIndex];
};

export const startCall = (id: string): VideoCall | null => {
  const callIndex = videoCalls.findIndex(call => call.id === id);
  if (callIndex === -1) return null;
  
  videoCalls[callIndex] = { 
    ...videoCalls[callIndex], 
    status: 'live',
    actualStart: new Date().toISOString()
  };
  
  return videoCalls[callIndex];
};

export const endCall = (id: string): VideoCall | null => {
  const callIndex = videoCalls.findIndex(call => call.id === id);
  if (callIndex === -1) return null;
  
  videoCalls[callIndex] = { 
    ...videoCalls[callIndex], 
    status: 'completed',
    actualEnd: new Date().toISOString()
  };
  
  return videoCalls[callIndex];
};