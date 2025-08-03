import { Request, Response } from 'express';
import { getAllPatients as fetchAllPatientsFromDB } from '../services/patient_service';

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await fetchAllPatientsFromDB();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
};





// export const getAllPatients = (req: Request, res: Response) => {
//   res.json({ message: 'list of all patients' });
// };
