import { Admin } from '../models/adminModel';
import bcrypt from 'bcrypt';

export const registerAdmin = async (fullName: string, email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return Admin.create({ fullName, email, password: hashed });
};

export const loginAdmin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) return null;

  const isMatch = await bcrypt.compare(password, admin.getDataValue('password'));
  return isMatch ? admin : null;
};

export const getAllAdmins = async () => {
  return Admin.findAll();
};