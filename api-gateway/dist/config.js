"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.services = void 0;
exports.services = {
    admin: 'http://localhost:5000',
    patient: 'http://localhost:5001',
    doctor: 'http://localhost:5002',
    nurse: 'http://localhost:5003',
    receptionist: 'http://localhost:5004',
    lab: 'http://localhost:5005',
    billing: 'http://localhost:5006'
};
exports.jwtSecret = process.env.JWT_SECRET || 'yoursecretkey';
