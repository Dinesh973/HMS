import React from 'react';
import './ReportsSection.scss';
import type { StatData } from '../types';

const ReportsSection: React.FC<{ reports: Array<{ label: string; value: number; color?: string }> }> = ({ reports }) => {
  return (
    <div className="hms-reports">
      {reports.map((r, i) => (
        <div className="report-card" key={i}>
          <div className="report-value" style={{ color: r.color || '#000' }}>{r.value}</div>
          <div className="report-label">{r.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ReportsSection;