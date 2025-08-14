import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

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
      'admin': '/admin/dashboard',
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
      const response = await fetch(`http://localhost:1000/${props.role}/login`, {
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
      
      // Validate role consistency (optional security check)
      if (data.user.role && data.user.role.toLowerCase() !== props.role.toLowerCase()) {
        throw new Error('Role mismatch. Please select the correct role.');
      }
      
      login(data.token, data.user);
      console.log('Auth context updated, navigating...');

      // Navigate to role-specific dashboard
      const dashboardPath = getRoleDashboard(props.role);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBackToRoleSelection}
            className="text-blue-600 hover:text-blue-700 text-sm"
            type="button"
          >
            ← Back to Role Selection
          </button>
        </div>
        
        <h2 className="text-2xl font-semibold text-center mb-4">
          {props.role.charAt(0).toUpperCase() + props.role.slice(1)} Login
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Forgot your password?{' '}
            <button
              className="text-blue-600 hover:text-blue-700"
              onClick={() => {/* Handle forgot password */}}
            >
              Reset here
            </button>
          </p>
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