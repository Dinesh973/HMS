import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { getAllUsers } from '../../services/adminService';
import { User } from '../../components/Dashboard/types';
import handleEdit from  '../Admin/users'

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [admins, setAdmins] = useState<User[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const data = await getAllUsers();
        setAdmins(data);

      } catch (err: any) {
        setError(err.message || 'Failed to load admins');
      } finally {
        setLoading(false);
      }
    }
    fetchAdmins();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>

      <p>Welcome, {user?.name}!</p>
      <p>Your role: {user?.role}</p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">All Admin Users</h2>
      {loading && <p>Loading admins...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <ul className="list-disc list-inside">
          {admins?.map((admin: any) => (
            <li key={admin.id}>
              {admin.name} - {admin.email}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleEdit}>Editt</button>
    </div>
  );
};

export default AdminDashboard;
