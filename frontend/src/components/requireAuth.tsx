import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const RequireAuth = ({ children, allowedRoles = [] }: RequireAuthProps): React.ReactElement => {
  const { user } = useAuth();
  const location = useLocation();

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if user has the required role (if allowedRoles is specified)
  if (allowedRoles.length > 0 && user.role) {
    const userRole = user.role.toLowerCase();
    const hasRequiredRole = allowedRoles.some(role => role.toLowerCase() === userRole);
    
    if (!hasRequiredRole) {
      // Redirect to user's own dashboard or role selection
      const userDashboard = `/${userRole}/dashboard`;
      return <Navigate to={userDashboard} replace />;
    }
  }

  return <>{children}</>;
};

export default RequireAuth;