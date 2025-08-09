import api from './api'; // Assuming api is axios instance
import { User } from '../types/user';
import { getToken } from '../utils/tokenHelpers'; // We'll create this helper

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/admin/users', { headers: authHeaders() });
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get<User>(`/admin/users/${id}`, { headers: authHeaders() });
  return res.data;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const res = await api.post<User>('/admin/users', user, { headers: authHeaders() });
  return res.data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const res = await api.put<User>(`/admin/users/${id}`, user, { headers: authHeaders() });
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/admin/users/${id}`, { headers: authHeaders() });
};
