export const services = {
  admin: 'http://localhost:5001',        // service-admin
  patient: 'http://localhost:5002',      // service-patient
  doctor: 'http://localhost:5003',       // service-doctor
  nurse: 'http://localhost:5004',        // service-nurse
  receptionist: 'http://localhost:5005', // service-receptionist
  lab: 'http://localhost:5006',          // service-lab
  billing: 'http://localhost:5007'       // service-billing
};

export const jwtSecret: string = process.env.JWT_SECRET || 'yoursecretkey';
