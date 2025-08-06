import { Patient } from '../models/patient';

export const getAllPatients = async () => {
  return await Patient.findAll();
};

export const createPatient = async (data: { name: string; age: number; gender: string }) => {
  try {
    return await Patient.create(data);
  } catch (err) {
    console.error('Sequelize error:', err); // 🔥
    throw err;
  }
};

