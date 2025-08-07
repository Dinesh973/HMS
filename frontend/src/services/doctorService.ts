import { api } from './api';
import { Doctor } from '../types/doctor';

const BASE_URL = '/doctors';

export const getAllDoctors = async (): Promise<Doctor[]> => {
  const response = await api.get<Doctor[]>(BASE_URL);
  return response.data;
};

export const getDoctorById = async (id: number): Promise<Doctor> => {
  const response = await api.get<Doctor>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createDoctor = async (doctorData: Partial<Doctor>): Promise<Doctor> => {
  const response = await api.post<Doctor>(BASE_URL, doctorData);
  return response.data;
};

export const updateDoctor = async (id: number, doctorData: Partial<Doctor>): Promise<Doctor> => {
  const response = await api.put<Doctor>(`${BASE_URL}/${id}`, doctorData);
  return response.data;
};

export const deleteDoctor = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}/${id}`);
};