import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DoctorLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Doctor Panel</h2>
        <nav className="space-y-2">
          <Link to="/doctor" className="block hover:underline">Dashboard</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;