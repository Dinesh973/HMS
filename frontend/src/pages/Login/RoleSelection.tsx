import React from 'react';
import { useNavigate } from 'react-router-dom';

const roles = [
  { name: 'Admin', path: '/admin/login' },
  { name: 'Doctor', path: '/doctor/login' },
  { name: 'Nurse', path: '/nurse/login' },
  { name: 'Patient', path: '/patient/login' },
  { name: 'Receptionist', path: '/receptionist/login' },
  { name: 'Pharmacist', path: '/pharmacist/login' },
  { name: 'Lab Technician', path: '/labtechnician/login' },
];

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Hospital Management System</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl">
        {roles.map((role) => (
          <button
            key={role.name}
            onClick={() => navigate(role.path)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
          >
            {role.name} Login
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;