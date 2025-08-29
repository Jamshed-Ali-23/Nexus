import { v4 as uuidv4 } from 'uuid';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  attendees?: string[];
  type: 'meeting' | 'call' | 'deadline' | 'other';
  status: 'scheduled' | 'cancelled' | 'completed';
  createdBy: string;
}

const calendarEvents: CalendarEvent[] = [
  {
    id: uuidv4(),
    title: 'Pitch Meeting with TechVentures',
    start: '2023-06-15T10:00:00',
    end: '2023-06-15T11:30:00',
    description: 'Present the new product roadmap and discuss funding opportunities',
    location: 'TechVentures HQ, 123 Innovation Drive',
    attendees: ['michael@vcinnovate.com', 'sarah@techwave.io'],
    type: 'meeting',
    status: 'scheduled',
    createdBy: 'sarah@techwave.io'
  },
  {
    id: uuidv4(),
    title: 'Follow-up Call with Investors',
    start: '2023-06-17T14:00:00',
    end: '2023-06-17T15:00:00',
    description: 'Discuss the terms of the investment and next steps',
    attendees: ['michael@vcinnovate.com', 'sarah@techwave.io'],
    type: 'call',
    status: 'scheduled',
    createdBy: 'michael@vcinnovate.com'
  },
  {
    id: uuidv4(),
    title: 'Product Demo',
    start: '2023-06-20T11:00:00',
    end: '2023-06-20T12:30:00',
    description: 'Demonstrate the MVP to potential investors',
    location: 'Virtual',
    attendees: ['michael@vcinnovate.com', 'sarah@techwave.io', 'alex@investor.com'],
    type: 'meeting',
    status: 'scheduled',
    createdBy: 'sarah@techwave.io'
  },
  {
    id: uuidv4(),
    title: 'Due Diligence Meeting',
    start: '2023-06-22T09:00:00',
    end: '2023-06-22T12:00:00',
    description: 'Review financial documents and business plan',
    location: 'Law Offices, 456 Legal Avenue',
    attendees: ['michael@vcinnovate.com', 'sarah@techwave.io', 'legal@techwave.io'],
    type: 'meeting',
    status: 'scheduled',
    createdBy: 'michael@vcinnovate.com'
  },
  {
    id: uuidv4(),
    title: 'Contract Signing',
    start: '2023-06-30T15:00:00',
    end: '2023-06-30T16:30:00',
    description: 'Sign investment agreement and related documents',
    location: 'TechWave Office, 789 Startup Street',
    attendees: ['michael@vcinnovate.com', 'sarah@techwave.io', 'legal@vcinnovate.com'],
    type: 'meeting',
    status: 'scheduled',
    createdBy: 'sarah@techwave.io'
  }
];

export const getUpcomingEvents = (userEmail: string, limit = 3): CalendarEvent[] => {
  return calendarEvents
    .filter(event => 
      event.attendees?.includes(userEmail) && 
      event.status === 'scheduled'
    )
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, limit);
};

export const getAllEvents = (userEmail: string): CalendarEvent[] => {
  return calendarEvents
    .filter(event => event.attendees?.includes(userEmail))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};

export const addEvent = (event: Omit<CalendarEvent, 'id'>): CalendarEvent => {
  const newEvent = { ...event, id: uuidv4() };
  calendarEvents.push(newEvent);
  return newEvent;
};

export const updateEvent = (id: string, updates: Partial<CalendarEvent>): CalendarEvent | null => {
  const eventIndex = calendarEvents.findIndex(event => event.id === id);
  if (eventIndex === -1) return null;
  
  calendarEvents[eventIndex] = { ...calendarEvents[eventIndex], ...updates };
  return calendarEvents[eventIndex];
};

export const deleteEvent = (id: string): boolean => {
  const eventIndex = calendarEvents.findIndex(event => event.id === id);
  if (eventIndex === -1) return false;
  
  calendarEvents.splice(eventIndex, 1);
  return true;
};