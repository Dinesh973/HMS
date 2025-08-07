import React from 'react';
import { useAuth } from '../../context/authContext';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>
      <p>Hello, {user?.name}!</p>
      <p>Your role: {user?.role}</p>
    </div>
  );
};

export default PatientDashboard;