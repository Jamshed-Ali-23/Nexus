import { EventInput } from '@fullcalendar/core';

export interface CalendarEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
}

export interface MeetingRequest {
  id: string;
  title: string;
  requester: string;
  requesterRole: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}