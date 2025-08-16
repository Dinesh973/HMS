import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../components/Dashboard/types'; // Adjust the import path as necessary

//  export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  console.log(' AuthProvider rendering with user:', user, 'token:', token);

  useEffect(() => {
    console.log('AuthProvider useEffect triggered, user:', user, 'token:', token);
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = (token: string, user: User) => {
    console.log('AuthContext login called with:', { token, user });
    setToken(token);
    setUser(user);
    console.log('AuthContext state updated');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


