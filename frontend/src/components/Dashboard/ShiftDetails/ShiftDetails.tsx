import React from 'react';
import './ShiftDetails.scss';
import type { NurseShift } from '../types';

const ShiftDetails: React.FC<{ shift: NurseShift | null }> = ({ shift }) => (
  <div className="hms-shift">
    <h3>Current Shift</h3>
    {shift ? (
      <div className="shift-body">
        <div className="row"><span>Ward:</span><span>{shift.ward}</span></div>
        <div className="row"><span>Patients:</span><span>{shift.patients}</span></div>
        <div className="row"><span>Shift Time:</span><span>{shift.startTime} - {shift.endTime}</span></div>
      </div>
    ) : (
      <div className="no-shift">No active shift</div>
    )}
  </div>
);

export default ShiftDetails;