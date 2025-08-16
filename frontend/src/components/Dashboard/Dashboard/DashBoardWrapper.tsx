import React from 'react';
import { useAuth } from '../../../context/authContext';
import Dashboard from './Dashboard';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';

const DashboardWrapper: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
   return null
//    (
//       <div className="dashboard-loading-container">
//         <div className="loading-content">
//           <LoadingSkeleton height="40px" />
//           <div className="skeleton-grid">
//             <LoadingSkeleton height="120px" />
//             <LoadingSkeleton height="120px" />
//             <LoadingSkeleton height="120px" />
//           </div>
//           <LoadingSkeleton height="200px" />
//         </div>
//       </div>
//     )
;
  }
  
  return <Dashboard currentUser={user} />;
};

export default DashboardWrapper;