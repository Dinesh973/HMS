import { RouteObject } from 'react-router-dom';
import RequireAuth from '../components/requireAuth';
import { useAuth } from '../context/authContext';

// Role Selection Page
import RoleSelection from '../components/LoginPage/RoleSelection';

// Dashboard Pages - Keep your existing dashboard components
import AdminDashboard from '../pages/Admin/dashboard';
import Dashboard from '../components/Dashboard/Dashboard/Dashboard';
import DashboardWrapper from '../components/Dashboard/Dashboard/DashBoardWrapper';

// import DoctorDashboard from '../pages/Doctor/dashboard';
// import PatientDashboard from '../pages/Patient/dashboard';
// import NurseDashboard from '../pages/Nurse/dashboard';
// import ReceptionistDashboard from '../pages/Receptionist/dashboard';
// import PharmacistDashboard from '../pages/Pharmacist/dashboard';
import LabTechnicianDashboard from '../pages/LabTechnician/dashboard';

// Unified Login Component
import LoginPage from '../components/LoginPage/LoginPage';

// 404 Page 
import NotFound from '../pages/notFound';

import { User } from '../components/Dashboard/types'; // Adjust the import path as necessary
import LoadingSkeleton from '../components/Dashboard/LoadingSkeleton/LoadingSkeleton';

// Wrapper component that handles the User | null type



export const publicRoutes: RouteObject[] = [
  // Root - Role Selection
  { path: '/', element: <RoleSelection /> },
  { path: '/role', element: <RoleSelection /> },

  // Login routes using unified LoginPage component
  { path: '/admin/login', element: <LoginPage role="admin" /> },
  { path: '/superadmin/login', element: <LoginPage role="admin" /> },
  { path: '/doctor/login', element: <LoginPage role="doctor" /> },
  { path: '/nurse/login', element: <LoginPage role="nurse" /> },
  { path: '/patient/login', element: <LoginPage role="patient" /> },
  { path: '/receptionist/login', element: <LoginPage role="receptionist" /> },
  { path: '/pharmacist/login', element: <LoginPage role="pharmacist" /> },
  { path: '/labtechnician/login', element: <LoginPage role="labtechnician" /> },

  // Protected Dashboard routes
  {
    path: '/admin/dashboard',
    element: (
      <RequireAuth allowedRoles={['admin', 'superadmin']}>
      {/* Admin DashBoard */}
        
        <DashboardWrapper />
      </RequireAuth>
    ),
  },
  {
    path: '/doctor/dashboard',
    element: (
      <RequireAuth allowedRoles={['doctor']}>
        {/* Doctor DashBoard*/}
        <DashboardWrapper /> 
      </RequireAuth>
    ),
  },
  {
    path: '/nurse/dashboard',
    element: (
      <RequireAuth allowedRoles={['nurse']}>
        {/* Nurse Dashboard */}
        <DashboardWrapper />
      </RequireAuth>
    ),
  },
  {
    path: '/patient/dashboard',
    element: (
      <RequireAuth allowedRoles={['patient']}>
        {/* Patient Dashboard */}
        <DashboardWrapper />
      </RequireAuth>
    ),
  },
  {
    path: '/receptionist/dashboard',
    element: (
      <RequireAuth allowedRoles={['receptionist']}>
        {/* ReceptionistDashboard */}
        <DashboardWrapper /> 
      </RequireAuth>
    ),
  },
  {
    path: '/pharmacist/dashboard',
    element: (
      <RequireAuth allowedRoles={['pharmacist']}>
        {/* PharmacistDashboard */}
        <DashboardWrapper /> 
      </RequireAuth>
    ),
  },
  {
    path: '/labtechnician/dashboard',
    element: (
      <RequireAuth allowedRoles={['labtechnician']}>
        {/* Lab Technician Dashboard */}
        <DashboardWrapper />
      </RequireAuth>
    ),
  },

  // 404 - Catch all
  { path: '*', element: <NotFound /> },
];



