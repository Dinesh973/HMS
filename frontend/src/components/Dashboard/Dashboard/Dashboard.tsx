import React, { useEffect, useState, useCallback } from 'react';
import './Dashboard.scss';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import StatCard from '../StatCard/StatCard';
import ReportsSection from '../ReportSection/ReportSection';
import AppointmentCalendar from '../AppointmentCalender/AppointmentCalender';
import RecentPatients from '../RecentPatients/RecentPatients';
import ShiftDetails from '../ShiftDetails/ShiftDetails';
import TaskList from '../TaskList/TaskList';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { getServiceForRole } from '../../../services/api';
import type { User, StatData, Appointment, PatientData, NurseShift, Task } from '../types';
import { Users, UserCheck, Activity, Pill, TestTube, Calculator, CreditCard, FileText, Calendar, CheckCircle, TrendingUp, Bed, Heart, Clock, AlertCircle, Syringe } from 'lucide-react';

interface DashboardProps {
  currentUser: User;
  onRoleChange?: (role: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatData[]>([]);
  const [reports, setReports] = useState<Array<{ label: string; value: number; color?: string }>>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [shift, setShift] = useState<NurseShift | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const service = getServiceForRole(currentUser.role);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Role-specific endpoints
      if (currentUser.role === 'admin') {
        const s = await service.request<StatData[]>('/stats');
        const r = await service.request<any[]>('/reports');
        if (s.status === 'success' && s.data) setStats(s.data as any);
        if (r.status === 'success' && r.data) setReports(r.data.map((x:any)=>({ label: x.label || 'Report', value: x.value || 0 })));
      }

      if (currentUser.role === 'doctor') {
        const d = await service.request<any>(`/dashboard/${currentUser.id}`);
        const a = await service.request<Appointment[]>(`/appointments/${currentUser.id}`);
        const p = await service.request<PatientData[]>(`/patients/${currentUser.id}`);
        if (d.status === 'success' && d.data) {
          // map to stats if present
          setStats(d.data.stats || []);
        }
        if (a.status === 'success' && a.data) setAppointments(a.data);
        if (p.status === 'success' && p.data) setPatients(p.data);
      }

      if (currentUser.role === 'nurse') {
        const d = await service.request<any>(`/dashboard/${currentUser.id}`);
        const shiftRes = await service.request<NurseShift>(`/shift/${currentUser.id}`);
        const t = await service.request<Task[]>(`/tasks/${currentUser.id}`);
        if (d.status === 'success' && d.data) setStats(d.data.stats || []);
        if (shiftRes.status === 'success' && shiftRes.data) setShift(shiftRes.data);
        if (t.status === 'success' && t.data) setTasks(t.data);
      }

      if (currentUser.role === 'patient') {
        const d = await service.request<any>(`/dashboard/${currentUser.id}`);
        const a = await service.request<Appointment[]>(`/appointments/${currentUser.id}`);
        const mh = await service.request<any[]>(`/medical-history/${currentUser.id}`);
        const v = await service.request<any>(`/vitals/${currentUser.id}`);
        if (d.status === 'success' && d.data) setStats(d.data.stats || []);
        if (a.status === 'success' && a.data) setAppointments(a.data);
        if (mh.status === 'success' && mh.data) setPatients(mh.data || [] as any);
        if (v.status === 'success' && v.data) {
          // we can map to local vitals state if needed
        }
      }

      // fallback demo defaults when empty (so UI doesn't break)
      if (!stats || stats.length === 0) {
        setStats([
          { label: 'Doctor', value: 2, change: 5, icon: Users, color: '#475569' },
          { label: 'Patient', value: 12, change: 15, icon: UserCheck, color: '#ef4444' },
          { label: 'Nurse', value: 1, change: 0, icon: Activity, color: '#3b82f6' },
        ]);
      }

      if (!reports || reports.length === 0) {
        setReports([
          { label: 'Birth Report', value: 1, color: '#f59e0b' },
          { label: 'Death Report', value: 0, color: '#ef4444' },
          { label: 'Operation Report', value: 1, color: '#10b981' },
        ]);
      }

    } catch (err) {
      console.error('Dashboard fetch failed', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser, service]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleTaskUpdate = async (taskId: string, completed: boolean) => {
    try {
      const res = await service.request(`/tasks/${taskId}`, { method: 'PATCH', body: JSON.stringify({ completed }) });
      if (res.status === 'success') {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed } : t));
      }
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  return (
    <div className="bhms-root">
      <Sidebar user={currentUser} />
      <div className="bhms-main">
        <Header user={currentUser} />

        <main className="bhms-content">
          <div className="page-header">
            <div className="title">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard</div>
            <div className="meta">
              {currentUser.department && <div className="dept">Department: {currentUser.department}</div>}
              {currentUser.shift && <div className="shift">Current Shift: {currentUser.shift}</div>}
            </div>
          </div>

          {loading ? (
            <div className="loading-grid">
              <LoadingSkeleton height="120px" />
              <LoadingSkeleton height="120px" />
              <LoadingSkeleton height="120px" />
            </div>
          ) : (
            <div className="dashboard-grid">
              <section className="stats-section">
                <div className="stats-grid">
                  {stats.map((s, idx) => (
                    <StatCard key={idx} {...s} />
                  ))}
                </div>
              </section>

              <section className="reports-section">
                <ReportsSection reports={reports} />
              </section>

              <section className="widgets">
                <div className="widget-left">
                  <AppointmentCalendar appointments={appointments} />
                </div>

                <div className="widget-right">
                  <RecentPatients patients={patients} />
                  <ShiftDetails shift={shift} />
                  <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
                </div>
              </section>

            </div>
          )}

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;



























// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../context/authContext';
// import { getAllUsers } from '../../services/adminService';
// import { User } from '../../types/user';

// export interface DashboardProps {role: string}


// const Dashboard: React.FC <DashboardProps> = (props) => {
//   const { user, logout } = useAuth();
//   const [admins, setAdmins] = useState<User[]>();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchAdmins() {
//       try {
//         const data = await getAllUsers();
//         setAdmins(data);

//       } catch (err: any) {
//         setError(err.message || 'Failed to load admins');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAdmins();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">{props.role}Dashboard</h1>
//         <button
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           onClick={() => logout()}
//         >
//           Logout
//         </button>
//       </div>

//       <p>Welcome, {user?.name}!</p>
//       <p>Your role: {user?.role}</p>

//       <h2 className="mt-6 mb-2 text-xl font-semibold">Users</h2>
//       {loading && <p>Loading admins...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!loading && !error && (
//         <ul className="list-disc list-inside">
//           {admins?.map((admin: any) => (
//             <li key={admin.id}>
//               {admin.name} - {admin.email}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };


// export default Dashboard;