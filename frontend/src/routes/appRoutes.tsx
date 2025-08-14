// import React from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';

const AppRoutes = () => {
  const routes = useRoutes(publicRoutes);
  return routes;
  
};

export default AppRoutes;

// src/routes/appRoutes.tsx
// import React from "react";
// import { Routes, Route, Navigate} from "react-router-dom";
// import LoginPage from "../components/LoginPage/LoginPage";
// import Dashboard from "../components/Dashboard/Dashboard/Dashboard";
// import { useAuth } from "../context/authContext";


// const AppRoutes = () => {
//   const { user } = useAuth();
//   console.log('AppRoutes rendering, current user:', user);
//   return (
//     // <Routes>
//     //   {/* Login route */}
//     //   <Route path="/admin/login" element={<LoginPage role="admin" />} />

//     //   {/* Protected admin dashboard */}
//     //   <Route
//     //     path="/admin/dashboard"
//     //     element={
//     //       user ? <Dashboard currentUser ={user} /> : <Navigate to="/admin/login" />
//     //     }
//     //   />
//     // </Routes>
//     <Routes>
//       {/* Root redirect */}
//       <Route path="/" element={<Navigate to="/Role" />} />
      
//       {/* Login route */}
//       <Route 
//         path="/admin/login" 
//         element={user ? <Navigate to="/admin/dashboard" /> : <LoginPage role="admin" />} 
//       />

//       {/* Protected admin dashboard */}
//       <Route
//         path="/admin/dashboard"
//         element={
//           user ? <Dashboard currentUser={user} /> : <Navigate to="/admin/login" />
//         }
//       />
      
//       {/* Catch all - redirect to login */}
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>

//   );
// };

// export default AppRoutes;
