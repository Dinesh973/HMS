import React from 'react';
import './LoadingSkeleton.scss';

const LoadingSkeleton: React.FC<{ height?: string }> = ({ height = '100px' }) => (
  <div className="skeleton" style={{ height }} />
);

export default LoadingSkeleton;