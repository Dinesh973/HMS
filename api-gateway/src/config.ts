export const services = {
  admin: 'http://localhost:5000',
  patient: 'http://localhost:5001',
  doctor: 'http://localhost:5002',
  nurse: 'http://localhost:5003',
  receptionist: 'http://localhost:5004',
  lab: 'http://localhost:5005',
  billing: 'http://localhost:5006'
};

export const jwtSecret: string = process.env.JWT_SECRET || 'yoursecretkey';
