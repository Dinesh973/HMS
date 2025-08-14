import { RouteObject } from 'react-router-dom';
import RequireAuth from '../components/requireAuth';

// Role Selection Page
import RoleSelection from '../pages/Login/RoleSelection';

// Dashboard Pages - Keep your existing dashboard components
import AdminDashboard from '../pages/Admin/dashboard';
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

export const publicRoutes: RouteObject[] = [
  // Root - Role Selection
  { path: '/', element: <RoleSelection /> },
  { path: '/role', element: <RoleSelection /> },

  // Login routes using unified LoginPage component
  { path: '/admin/login', element: <LoginPage role="admin" /> },
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
      <RequireAuth allowedRoles={['admin']}>
        <AdminDashboard />
      </RequireAuth>
    ),
  },
  {
    path: '/doctor/dashboard',
    element: (
      <RequireAuth allowedRoles={['doctor']}>
        {/* <DoctorDashboard /> */}
        <AdminDashboard /> {/* Using AdminDashboard as placeholder - replace when you create DoctorDashboard */}
      </RequireAuth>
    ),
  },
  {
    path: '/nurse/dashboard',
    element: (
      <RequireAuth allowedRoles={['nurse']}>
        {/* <NurseDashboard /> */}
        <AdminDashboard /> {/* Using AdminDashboard as placeholder - replace when you create NurseDashboard */}
      </RequireAuth>
    ),
  },
  {
    path: '/patient/dashboard',
    element: (
      <RequireAuth allowedRoles={['patient']}>
        {/* <PatientDashboard /> */}
        <AdminDashboard /> {/* Using AdminDashboard as placeholder - replace when you create PatientDashboard */}
      </RequireAuth>
    ),
  },
  {
    path: '/receptionist/dashboard',
    element: (
      <RequireAuth allowedRoles={['receptionist']}>
        {/* <ReceptionistDashboard /> */}
        <AdminDashboard /> {/* Using AdminDashboard as placeholder - replace when you create ReceptionistDashboard */}
      </RequireAuth>
    ),
  },
  {
    path: '/pharmacist/dashboard',
    element: (
      <RequireAuth allowedRoles={['pharmacist']}>
        {/* <PharmacistDashboard /> */}
        <AdminDashboard /> {/* Using AdminDashboard as placeholder - replace when you create PharmacistDashboard */}
      </RequireAuth>
    ),
  },
  {
    path: '/labtechnician/dashboard',
    element: (
      <RequireAuth allowedRoles={['labtechnician']}>
        <LabTechnicianDashboard />
      </RequireAuth>
    ),
  },

  // 404 - Catch all
  { path: '*', element: <NotFound /> },
];



// export const publicRoutes: RouteObject[] = [
//   { path: '/', element: <RoleSelection /> },

//   { path: '/admin/login', element: <AdminLogin /> },
//   {
//     path: '/admin/dashboard',
//     element: (
//       <RequireAuth>
//         <AdminDashboard />
//       </RequireAuth>
//     ),
//   },