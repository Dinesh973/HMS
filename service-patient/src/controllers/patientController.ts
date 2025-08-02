import { Request, Response } from 'express';

export const getAllPatients = (req: Request, res: Response) => {
  res.json({ message: 'list of all patients' });
};
