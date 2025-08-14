import React from 'react';
import './Sidebar.scss';
import { Activity, Users } from 'lucide-react';
import type { User, UserRole } from '../types';

const Sidebar: React.FC<{ user: User }> = ({ user }) => {
  const menuItems: Record<UserRole, Array<{ icon: any; label: string; path?: string; active?: boolean }>> = {
  superadmin: [
      { icon: Activity, label: 'Dashboard', path: '/admin/dashboard', active: true },
      { icon: Users, label: 'Users', path: '/admin/users' },
      { icon: Users, label: 'Departments', path: '/admin/departments' },
      { icon: Users, label: 'Settings', path: '/admin/settings' },
    ],
    admin: [
      { icon: Activity, label: 'Dashboard', path: '/admin/dashboard', active: true },
      { icon: Users, label: 'Department', path: '/admin/departments' },
    ],
    doctor: [
      { icon: Activity, label: 'Dashboard', path: '/doctor/dashboard', active: true },
      { icon: Users, label: 'Patients', path: '/doctor/patients' },
    ],
    nurse: [
      { icon: Activity, label: 'Dashboard', path: '/nurse/dashboard', active: true },
      { icon: Users, label: 'Patients', path: '/nurse/patients' },
    ],
    patient: [
      { icon: Activity, label: 'Dashboard', path: '/patient/dashboard', active: true },
      { icon: Users, label: 'My Appointments', path: '/patient/appointments' },
    ],
    pharmacist: [
      { icon: Activity, label: 'Dashboard', path: '/pharmacy/dashboard', active: true },
    ],
    laboratorist: [
      { icon: Activity, label: 'Dashboard', path: '/lab/dashboard', active: true },
    ],
    accountant: [
      { icon: Activity, label: 'Dashboard', path: '/accounting/dashboard', active: true },
    ],
    receptionist: [
      { icon: Activity, label: 'Dashboard', path: '/reception/dashboard', active: true },
    ],
  };

  return (
    <aside className="hms-sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-icon"><Activity /></div>
          <div className="brand-text">HMS</div>
        </div>

        <div className="user-box">
          <div className="avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <div className="avatar-fallback">{user.name?.charAt(0).toUpperCase()}</div>
            )}
          </div>
          <div className="user-meta">
            <div className="welcome">Welcome,</div>
            <div className="name">{user.name}</div>
            {user.specialization && <div className="spec">{user.specialization}</div>}
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems[user.role].map((item, idx) => (
          <a key={idx} className={`nav-item ${item.active ? 'active' : ''}`} href={item.path || '#'}>
            <item.icon />
            <span className="label">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
