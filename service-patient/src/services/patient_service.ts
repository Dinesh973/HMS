import Patient from '../models/patient';

export const getAllPatients = async () => {
    const patients = await Patient.findAll();
    return patients;
};