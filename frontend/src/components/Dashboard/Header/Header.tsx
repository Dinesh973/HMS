import React from 'react';
import './Header.scss';
import { Bell, Globe, Users } from 'lucide-react';
import type { User } from '../types';

const Header: React.FC<{ user: User }> = ({ user }) => {
  return (
    <header className="hms-header">
      <div className="left">
        <h1>Hospital Management System</h1>
      </div>
      <div className="right">
        <div className="meta">
          <div className="role"><Users /> <span>{user.role}</span></div>
          <Bell className="icon" />
          <Globe className="icon" />
          <button className="logout">Logout</button>
        </div>
      </div>
    </header>
  );
};
export default Header;