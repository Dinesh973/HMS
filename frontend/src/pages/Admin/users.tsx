import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Dummy data load on mount
  useEffect(() => {
    const dummyUsers: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'patient' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'doctor' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'nurse' },
      { id: 4, name: 'David', email: 'david@example.com', role: 'receptionist' },
      { id: 5, name: 'Eva', email: 'eva@example.com', role: 'pharmacist' },
      { id: 6, name: 'Frank', email: 'frank@example.com', role: 'lab_technician' },
      { id: 7, name: 'Grace', email: 'grace@example.com', role: 'accountant' },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert(`Edit user with ID: ${id}`);
    // You’ll plug in the modal here later
  };

  const handleAdd = () => {
    alert('Open add user modal');
  };

  // Search + Pagination
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border px-3 py-2 rounded w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Email</th>
              <th className="text-left p-3 border-b">Role</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role.replace('_', ' ')}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;