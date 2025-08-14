console.log('ADMIN SERVICE URL:', process.env.REACT_APP_ADMIN_SERVICE_URL);



export class BaseApiService {
  public baseUrl: string;
  constructor(base: string) {
    this.baseUrl = base;
  }

  public async request<T>(endpoint: string, options?: RequestInit) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options?.headers,
        },
        ...options,
      });

      const data = await res.json();

      if (!res.ok) {
        return { data: data || null, status: 'error', message: data?.message || res.statusText };
      }

      return { data: data as T, status: 'success' };
    } catch (err) {
      return { data: null as unknown as T, status: 'error', message: err instanceof Error ? err.message : 'Unknown error' };
    }
  }
}

export const getServiceForRole = (role: string) => {
  const base = process.env.REACT_APP_API_BASE_URL || '';
  switch (role) {
    case 'admin':
      return new BaseApiService(process.env.REACT_APP_ADMIN_SERVICE_URL || `${base}/service-admin`);
    case 'doctor':
      return new BaseApiService(process.env.REACT_APP_DOCTOR_SERVICE_URL || `${base}/service-doctor`);
    case 'nurse':
      return new BaseApiService(process.env.REACT_APP_NURSE_SERVICE_URL || `${base}/service-nurse`);
    case 'patient':
      return new BaseApiService(process.env.REACT_APP_PATIENT_SERVICE_URL || `${base}/service-patient`);
    case 'pharmacist':
      return new BaseApiService(process.env.REACT_APP_PHARMACY_SERVICE_URL || `${base}/service-pharmacy`);
    case 'laboratorist':
      return new BaseApiService(process.env.REACT_APP_LAB_SERVICE_URL || `${base}/service-lab`);
    case 'accountant':
      return new BaseApiService(process.env.REACT_APP_ACCOUNTING_SERVICE_URL || `${base}/service-accounting`);
    case 'receptionist':
      return new BaseApiService(process.env.REACT_APP_RECEPTION_SERVICE_URL || `${base}/service-reception`);
    default:
      return new BaseApiService(base);
  }
};

















// import axios from 'axios';

// // API Gateway URL
// const API_BASE_URL = 'http://localhost:1000'; // Changed from 5000 to gateway port

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;
