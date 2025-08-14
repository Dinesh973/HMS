// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/authContext';

// const NurseLogin: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // try {
//     //   const response = await fetch('http://localhost:5004/api/nurse/login', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({ email, password }),
//     //   });

//     //   const data = await response.json();

//     //   if (response.ok) {
//     //     login({ name: data.name, email: data.email, role: data.role });
//     //     navigate('/nurse/dashboard');
//     //   } else {
//     //     alert(data.message || 'Login failed');
//     //   }
//     // } catch (error) {
//     //   console.error('Login error:', error);
//     //   alert('Something went wrong');
//     // }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6">Nurse Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 px-3 py-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 px-3 py-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NurseLogin;

export default {}