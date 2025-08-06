import { Request, Response } from 'express';
import { getAllPatients as fetchAllPatientsFromDB, createPatient as createPatientInDB } from '../services/patient_service';

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await fetchAllPatientsFromDB();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const { name, age, gender } = req.body;
    console.log('Received data:', { name, age, gender }); // 🔍 Check incoming data

    const newPatient = await createPatientInDB({ name, age, gender });
    console.log('Patient created:', newPatient); // 🔍 Check DB response

    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error); // 🔥 Full error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

