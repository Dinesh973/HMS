import { Request, Response } from 'express';
import { loginAdmin, registerAdmin, getAllAdmins } from '../service/adminService';
import { generateToken } from '../utils/jwt.util';


export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  const admin = await registerAdmin(fullName, email, password);
  res.status(201).json(admin);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await loginAdmin(email, password);
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken({ id: admin.getDataValue('id'), role: 'admin' });
  res.status(200).json({ token });
};

export const getAll = async (_: Request, res: Response) => {
  const admins = await getAllAdmins();
  res.status(200).json(admins);
};