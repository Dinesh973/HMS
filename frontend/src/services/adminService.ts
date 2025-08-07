import { api } from './api';
import { User } from '../types/user';

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/admin/users');
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get<User>(`/admin/users/${id}`);
  return res.data;
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  const res = await api.post<User>('/admin/users', user);
  return res.data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const res = await api.put<User>(`/admin/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/admin/users/${id}`);
};