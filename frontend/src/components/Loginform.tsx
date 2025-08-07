import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <form>
      <input type="text" placeholder="Username" className="border p-2 mb-2" />
      <input type="password" placeholder="Password" className="border p-2 mb-2" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  );
};

export default LoginForm;