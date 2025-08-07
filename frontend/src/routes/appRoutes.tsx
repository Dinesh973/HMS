import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';

import AdminLayout from '../layouts/adminLayout';
import DoctorLayout from '../layouts/doctorLayout';
import PatientLayout from '../layouts/patientLayout';
import NurseLayout from '../layouts/nurseLayout';
import ReceptionistLayout from '../layouts/receptionistLayout';
import PharmacistLayout from '../layouts/pharmacistLayout';
import LabTechnicianLayout from '../layouts/labTechnicianLayout';

import AdminLogin from '../pages/Admin/login';

import AdminDashboard from '../pages/Admin/dashboard';
import AdminUsers from '../pages/Admin/users';

import DoctorDashboard from '../pages/Doctor/dashboard';
import PatientDashboard from '../pages/Patient/dashboard';
import NurseDashboard from '../pages/Nurse/dashboard';
import ReceptionistDashboard from '../pages/Receptionist/dashboard';
import PharmacistDashboard from '../pages/Pharmacist/dashboard'
import LabTechnicianDashboard from '../pages/LabTechnician/dashboard';

import NotFound from '../pages/notFound';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<RequireRole role="admin"><AdminLayout /></RequireRole>}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* Doctor */}
      <Route path="/doctor" element={<RequireRole role="doctor"><DoctorLayout /></RequireRole>}>
        <Route index element={<DoctorDashboard />} />
      </Route>

      {/* Patient */}
      <Route path="/patient" element={<RequireRole role="patient"><PatientLayout /></RequireRole>}>
        <Route index element={<PatientDashboard />} />
      </Route>

      {/* Nurse */}
      <Route path="/nurse" element={<RequireRole role="nurse"><NurseLayout /></RequireRole>}>
        <Route index element={<NurseDashboard />} />
      </Route>

      {/* Receptionist */}
      <Route path="/receptionist" element={<RequireRole role="receptionist"><ReceptionistLayout /></RequireRole>}>
        <Route index element={<ReceptionistDashboard />} />
      </Route>

      {/* Pharmacist */}
      <Route path="/pharmacist" element={<RequireRole role="pharmacist"><PharmacistLayout /></RequireRole>}>
        <Route index element={<PharmacistDashboard />} />
      </Route>

      {/* Lab Technician */}
      <Route path="/lab" element={<RequireRole role="labtechnician"><LabTechnicianLayout /></RequireRole>}>
        <Route index element={<LabTechnicianDashboard />} />
      </Route>

      {/* Default route */}
      <Route path="/" element={<Navigate to={user ? `/${user.role}` : '/admin/login'} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Wrapper component to restrict access based on role
const RequireRole: React.FC<{ role: string; children: React.ReactNode }> = ({ role, children }) => {
  const { user } = useAuth();
  if (!user || user.role !== role) {
    return <Navigate to="/admin/login" />;
  }
  return <>{children}</>;
};

export default AppRoutes;