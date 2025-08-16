import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.scss'; // Import the SCSS file

const roles = [
  { name: 'Admin', path: '/admin/login'  },
  { name: 'Doctor', path: '/doctor/login'  },
  { name: 'Nurse', path: '/nurse/login' },
  { name: 'Patient', path: '/patient/login' },
  { name: 'Receptionist', path: '/receptionist/login' },
  { name: 'Pharmacist', path: '/pharmacist/login' },
  { name: 'Lab Technician', path: '/labtechnician/login' },
];

 const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection-container">
      <div className="role-selection-header">
        <div className="brand-logo">HMS</div>
        <h1 className="system-title">Hospital Management System</h1>
        <p className="system-subtitle">Select your role to continue</p>
      </div>
      
      <div className="role-selection-grid">
        {roles.map((role, index) => (
          <button
            key={role.name}
            onClick={() => navigate(role.path)}
            className={`role-button ${role.name.toLowerCase().replace(' ', '')}`}
          >
            <div className="role-icon">
              {role.name.charAt(0)}
            </div>
            <div className="role-name">{role.name}</div>
           
          </button>
        ))}
      </div>
      
      <div className="role-selection-footer">
        <p className="footer-text">Need help? Contact support</p>
        <a href="/support" className="support-link">Get Support</a>
      </div>
    </div>
  );
};

export default RoleSelection;