import { RouteObject } from 'react-router-dom';
import RequireAuth from '../components/requireAuth';

// Role Selection Page
import RoleSelection from '../pages/Login/RoleSelection';

// Admin Pages
import AdminLogin from '../pages/Admin/login';
import AdminDashboard from '../pages/Admin/dashboard';

// Doctor Pages
import DoctorLogin from '../pages/Doctor/login';
import DoctorDashboard from '../pages/Doctor/dashboard';

// Patient Pages
import PatientLogin from '../pages/Patient/login';
import PatientDashboard from '../pages/Patient/dashboard';

// Nurse Pages
// import NurseLogin from '../pages/Nurse/login';
// import NurseDashboard from '../pages/Nurse/dashboard';

// Receptionist Pages
import ReceptionistLogin from '../pages/Receptionist/login';
import ReceptionistDashboard from '../pages/Receptionist/dashboard';

// Pharmacist Pages
// import PharmacistLogin from '../pages/Pharmacist/login';
// import PharmacistDashboard from '../pages/Pharmacist/dashboard';

// Lab Technician Pages
// import LabTechnicianLogin from '../pages/LabTechnician/login';
import LabTechnicianDashboard from '../pages/LabTechnician/dashboard';

// 404 Page (Optional)
import NotFound from '../pages/notFound';

export const publicRoutes: RouteObject[] = [
  { path: '/', element: <RoleSelection /> },

  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin/dashboard',
    element: (
      <RequireAuth>
        <AdminDashboard />
      </RequireAuth>
    ),
  },

  { path: '/doctor/login', element: <DoctorLogin /> },
  { path: '/doctor/dashboard', element: <DoctorDashboard /> },

  { path: '/patient/login', element: <PatientLogin /> },
  { path: '/patient/dashboard', element: <PatientDashboard /> },

  // { path: '/nurse/login', element: <NurseLogin /> },
  // { path: '/nurse/dashboard', element: <NurseDashboard /> },

  { path: '/receptionist/login', element: <ReceptionistLogin /> },
  { path: '/receptionist/dashboard', element: <ReceptionistDashboard /> },

  // { path: '/pharmacist/login', element: <PharmacistLogin /> },
  // { path: '/pharmacist/dashboard', element: <PharmacistDashboard /> },

  // { path: '/lab-technician/login', element: <LabTechnicianLogin /> },
  // { path: '/lab-technician/dashboard', element: <LabTechnicianDashboard /> },

  { path: '*', element: <NotFound /> },
];