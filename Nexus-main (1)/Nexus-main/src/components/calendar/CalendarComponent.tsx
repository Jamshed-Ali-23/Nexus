import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

interface CalendarComponentProps {
  initialEvents?: EventInput[];
  onEventAdd?: (event: EventInput) => void;
  onEventChange?: (event: EventInput) => void;
  onEventDelete?: (eventId: string) => void;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  initialEvents = [],
  onEventAdd,
  onEventChange,
  onEventDelete
}) => {
  const [events, setEvents] = useState<EventInput[]>(initialEvents);

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Please enter a title for your meeting');
    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      
      setEvents([...events, newEvent]);
      
      if (onEventAdd) {
        onEventAdd(newEvent);
      }
    }
    selectInfo.view.calendar.unselect();
  };

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      
      if (onEventDelete) {
        onEventDelete(clickInfo.event.id);
      }
    }
  };

  const handleEventChange = (changeInfo: any) => {
    if (onEventChange) {
      onEventChange({
        id: changeInfo.event.id,
        title: changeInfo.event.title,
        start: changeInfo.event.startStr,
        end: changeInfo.event.endStr,
        allDay: changeInfo.event.allDay
      });
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventChange={handleEventChange}
        height="auto"
      />
    </div>
  );
};