import React from 'react';
import './StatCard.scss';
import type { StatData } from '../types';

const StatCard: React.FC<StatData> = ({ label, value, change = 0, icon: Icon, color = '#3b82f6' }) => {
  return (
    <div className="hms-stat-card">
      <div className="stat-left">
        <div className="stat-icon" style={{ backgroundColor: color }}>
          {Icon ? <Icon className="icon-svg" /> : null}
        </div>
      </div>
      <div className="stat-right">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {change !== 0 && (
          <div className={`stat-change ${change > 0 ? 'positive' : 'negative'}`}>{change > 0 ? '+' : ''}{change}%</div>
        )}
      </div>
    </div>
  );
};

export default StatCard;