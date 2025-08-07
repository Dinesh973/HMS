// src/pages/Pharmacist/Dashboard.tsx
import React from 'react';
import { useAuth } from '../../context/authContext';

const PharmacistDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome to Pharmacist Dashboard</h1>
        <p className="text-gray-700">Hello, {user?.name || 'Pharmacist'}!</p>
        <p className="text-gray-700 mt-2">Email: {user?.email}</p>
        <p className="text-gray-700 mt-2">Role: {user?.role}</p>
      </div>
    </div>
  );
};

export default PharmacistDashboard;