import React, { useState } from 'react';
import { CalendarComponent } from '../../components/calendar/CalendarComponent';
import { MeetingRequest, MeetingRequestProps } from '../../components/calendar/MeetingRequest';
import { AvailabilitySlot, AvailabilitySlotProps } from '../../components/calendar/AvailabilitySlot';
import { EventInput } from '@fullcalendar/core';

// Mock data for initial events
const initialEvents: EventInput[] = [
  {
    id: '1',
    title: 'Investor Meeting',
    start: new Date(new Date().setHours(10, 0)).toISOString(),
    end: new Date(new Date().setHours(11, 30)).toISOString(),
  },
  {
    id: '2',
    title: 'Pitch Review',
    start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
  },
];

// Mock data for meeting requests
const initialMeetingRequests: MeetingRequestProps[] = [
  {
    id: '101',
    title: 'Funding Discussion',
    requester: 'John Smith',
    requesterRole: 'Investor',
    date: '2023-06-15',
    time: '14:00',
    status: 'pending',
  },
  {
    id: '102',
    title: 'Product Demo',
    requester: 'Sarah Johnson',
    requesterRole: 'Entrepreneur',
    date: '2023-06-17',
    time: '10:30',
    status: 'accepted',
  },
];

// Mock data for availability slots
const initialAvailabilitySlots: AvailabilitySlotProps[] = [
  {
    id: '201',
    day: 'Monday',
    startTime: '09:00',
    endTime: '12:00',
  },
  {
    id: '202',
    day: 'Wednesday',
    startTime: '13:00',
    endTime: '17:00',
  },
  {
    id: '203',
    day: 'Friday',
    startTime: '10:00',
    endTime: '15:00',
  },
];

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<EventInput[]>(initialEvents);
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequestProps[]>(initialMeetingRequests);
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlotProps[]>(initialAvailabilitySlots);
  const [activeTab, setActiveTab] = useState<'calendar' | 'requests' | 'availability'>('calendar');

  // Handle event operations
  const handleEventAdd = (event: EventInput) => {
    setEvents([...events, event]);
  };

  const handleEventChange = (updatedEvent: EventInput) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  // Handle meeting request operations
  const handleAcceptRequest = (requestId: string) => {
    setMeetingRequests(meetingRequests.map(request => 
      request.id === requestId ? { ...request, status: 'accepted' as const } : request
    ));
    
    // Add the accepted meeting to the calendar
    const acceptedRequest = meetingRequests.find(request => request.id === requestId);
    if (acceptedRequest) {
      const [year, month, day] = acceptedRequest.date.split('-').map(Number);
      const [hours, minutes] = acceptedRequest.time.split(':').map(Number);
      
      const startDate = new Date(year, month - 1, day, hours, minutes);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 1); // Default 1 hour meeting
      
      handleEventAdd({
        id: `meeting-${acceptedRequest.id}`,
        title: acceptedRequest.title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    setMeetingRequests(meetingRequests.map(request => 
      request.id === requestId ? { ...request, status: 'declined' as const } : request
    ));
  };

  // Handle availability slot operations
  const handleAddAvailabilitySlot = () => {
    const day = prompt('Enter day of week:');
    const startTime = prompt('Enter start time (HH:MM):');
    const endTime = prompt('Enter end time (HH:MM):');
    
    if (day && startTime && endTime) {
      const newSlot: AvailabilitySlotProps = {
        id: String(Date.now()),
        day,
        startTime,
        endTime,
      };
      
      setAvailabilitySlots([...availabilitySlots, newSlot]);
    }
  };

  const handleEditAvailabilitySlot = (slotId: string) => {
    const slotToEdit = availabilitySlots.find(slot => slot.id === slotId);
    if (!slotToEdit) return;
    
    const day = prompt('Enter day of week:', slotToEdit.day);
    const startTime = prompt('Enter start time (HH:MM):', slotToEdit.startTime);
    const endTime = prompt('Enter end time (HH:MM):', slotToEdit.endTime);
    
    if (day && startTime && endTime) {
      setAvailabilitySlots(availabilitySlots.map(slot => 
        slot.id === slotId ? { ...slot, day, startTime, endTime } : slot
      ));
    }
  };

  const handleDeleteAvailabilitySlot = (slotId: string) => {
    if (confirm('Are you sure you want to delete this availability slot?')) {
      setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== slotId));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Calendar & Scheduling</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'calendar' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'requests' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('requests')}
        >
          Meeting Requests
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'availability' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('availability')}
        >
          Availability
        </button>
      </div>
      
      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div>
          <p className="text-gray-600 mb-4">
            Click on a date to add a new meeting. Drag events to reschedule them.
          </p>
          <div className="bg-white rounded-lg shadow-md p-4">
            <CalendarComponent
              initialEvents={events}
              onEventAdd={handleEventAdd}
              onEventChange={handleEventChange}
              onEventDelete={handleEventDelete}
            />
          </div>
        </div>
      )}
      
      {/* Meeting Requests Tab */}
      {activeTab === 'requests' && (
        <div>
          <p className="text-gray-600 mb-4">
            Review and respond to meeting requests from investors and entrepreneurs.
          </p>
          <div className="space-y-4">
            {meetingRequests.map(request => (
              <MeetingRequest
                key={request.id}
                {...request}
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
              />
            ))}
            {meetingRequests.length === 0 && (
              <p className="text-gray-500 italic">No meeting requests at this time.</p>
            )}
          </div>
        </div>
      )}
      
      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Set your regular availability for meetings.
            </p>
            <button
              onClick={handleAddAvailabilitySlot}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add Availability
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            {availabilitySlots.map(slot => (
              <AvailabilitySlot
                key={slot.id}
                {...slot}
                onEdit={handleEditAvailabilitySlot}
                onDelete={handleDeleteAvailabilitySlot}
              />
            ))}
            {availabilitySlots.length === 0 && (
              <p className="text-gray-500 italic">No availability slots set. Add some to let others know when you're available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;