import React from 'react';
import { useAuth } from '../../context/authContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <p>Your role: {user?.role}</p>
    </div>
  );
};

export default AdminDashboard;