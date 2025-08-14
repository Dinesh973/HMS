import React from 'react';
import './AppointmentCalender.scss'; 
import type { Appointment } from '../types';

const AppointmentCalendar: React.FC<{ appointments: Appointment[] }> = ({ appointments }) => {
  return (
    <div className="hms-calendar">
      <h3>Today's Schedule</h3>
      <div className="calendar-list">
        {appointments.slice(0, 8).map(a => (
          <div className="calendar-item" key={a.id}>
            <div className="calendar-left">
              <div className="pname">{a.patientName}</div>
              <div className="ptype">{a.type}</div>
            </div>
            <div className="calendar-right">
              <div className="time">{a.time}</div>
              <div className={`status ${a.status}`}>{a.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentCalendar;