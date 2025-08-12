import React from 'react';
import './RecentPatients.scss';
import type { PatientData } from '../types';

const RecentPatients: React.FC<{ patients: PatientData[] }> = ({ patients }) => (
  <div className="bhms-recent">
    <h3>Recent Patients</h3>
    <div className="list">
      {patients.slice(0, 6).map(p => (
        <div key={p.id} className="patient-item">
          <div>
            <div className="pname">{p.name}</div>
            <div className="pcond">{p.condition}</div>
          </div>
          <div className="pmeta">Age: {p.age}</div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentPatients;