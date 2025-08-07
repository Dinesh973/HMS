import React from 'react';
import { useAuth } from '../../context/authContext';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome, Dr. {user?.name}</h1>
      <p className="text-lg text-gray-700">Email: {user?.email}</p>
      <p className="text-lg text-gray-700">Role: {user?.role}</p>
      {/* You can add doctor-specific dashboard components here */}
    </div>
  );
};

export default DoctorDashboard;