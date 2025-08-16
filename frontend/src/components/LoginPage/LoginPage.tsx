import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { ArrowLeft, Mail, Lock, AlertTriangle } from 'lucide-react';
import './LoginPage.scss';

export interface LoginPageProps {
  role: string;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Role-based dashboard mapping
  const getRoleDashboard = (role: string): string => {
    const dashboardMap: { [key: string]: string } = {
      'admin' : '/admin/dashboard',
      'superadmin': '/admin/dashboard',
      'doctor': '/doctor/dashboard',
      'nurse': '/nurse/dashboard',
      'patient': '/patient/dashboard',
      'receptionist': '/receptionist/dashboard',
      'pharmacist': '/pharmacist/dashboard',
      'labtechnician': '/labtechnician/dashboard',
    };
    
    return dashboardMap[role.toLowerCase()] || '/dashboard';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/${props.role}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response received:', response.status);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Login failed');
      }

      const data = await response.json();
      // Backend should return { token, user: {name, email, role} }
      console.log('Login successful, data:', data);
      
      // // Validate role consistency (optional security check)
      // if (data.user.role && data.user.role.toLowerCase() !== props.role.toLowerCase()) {
      //   throw new Error('Role mismatch. Please select the correct role.');
      // }
      
      login(data.token, data.user);
      console.log('Auth context updated, navigating...');

      // Navigate to role-specific dashboard
      const dashboardPath = getRoleDashboard(data.user.role);
      navigate(dashboardPath);
      console.log(`Navigate called to: ${dashboardPath}`); 

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToRoleSelection = () => {
    navigate('/');
  };

   const handleForgotPassword = () => {
    // Implement forgot password functionality
    console.log('Forgot password clicked for role:', props.role);
  };

  const getRoleDisplayName = (role: string): string => {
    const roleNames: { [key: string]: string } = {
      'admin': 'Administrator',
      'superadmin': 'Super Administrator',
      'doctor': 'Doctor',
      'nurse': 'Nurse',
      'patient': 'Patient',
      'receptionist': 'Receptionist',
      'pharmacist': 'Pharmacist',
      'labtechnician': 'Lab Technician',
    };
    
    return roleNames[role.toLowerCase()] || role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getRoleIcon = (role: string): string => {
    const iconMap: { [key: string]: string } = {
      'admin': '👨‍💼',
      'superadmin': '👑',
      'doctor': '👨‍⚕️',
      'nurse': '👩‍⚕️',
      'patient': '🧑‍🦽',
      'receptionist': '👩‍💻',
      'pharmacist': '💊',
      'labtechnician': '🔬',
    };
    
    return iconMap[role.toLowerCase()] || '👤';
  };

  return (
    <div className={`login-container ${props.role}`}>
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <button
            onClick={handleBackToRoleSelection}
            className="back-button"
            type="button"
          >
            <ArrowLeft size={16} />
            Back to Role Selection
          </button>
          
          {/* <div className="brand-logo">
            {getRoleIcon(props.role)}
          </div> */}
          
          
          
          <h1 className="login-title">
            {getRoleDisplayName(props.role)} Portal
          </h1>
          <p className="login-subtitle">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading && <span className="loading-spinner"></span>}
            <span className="button-text">
              {loading ? 'Signing In...' : 'Sign In'}
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <div className="forgot-password">
            Forgot your password?{' '}
            <button
              type="button"
              className="reset-link"
              onClick={handleForgotPassword}
            >
              Reset here
            </button>
          </div>

          <div className="divider">
            <span className="divider-text">Hospital Management System</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/authContext';

// export interface LoginPageProps {role: string}


// const LoginPage: React.FC <LoginPageProps> = (props) => {

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:5000/${props.role}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//        console.log('Response received:', response.status);

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.message || 'Login failed');
//       }

//       const data = await response.json();
//       // Backend should return { token, user: {name, email, role} }
//       console.log('Login successful, data:', data);
      
//       login(data.token, data.user);
//       console.log('Auth context updated, navigating...');

//       navigate('/admin/dashboard');
//       console.log('Navigate called'); 

//     } catch (err: any) {
//       console.error('Login error:', err);

//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
//         <h2 className="text-2xl font-semibold text-center mb-4">{props.role} Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 border rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             disabled={loading}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-2 border rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             disabled={loading}
//           />
//           {error && <p className="text-red-600">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };


// export default LoginPage;