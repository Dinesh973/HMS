import { getServiceForRole } from './api';
// import { User } from '../types/user';
import { getToken } from '../utils/tokenHelpers';
import { User } from '../components/Dashboard/types';

const api = getServiceForRole('admin');

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.request<User[]>('/admin/users', { method: 'GET' });
  return res.data!;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.request<User>(`/admin/users/${id}`, { method: 'GET' });
  return res.data!;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const res = await api.request<User>('/admin/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return res.data!;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const res = await api.request<User>(`/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
  return res.data!;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.request(`/admin/users/${id}`, { method: 'DELETE' });
};
