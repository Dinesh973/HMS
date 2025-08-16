export type UserRole = 'admin' | 'superadmin' | 'doctor' | 'nurse' | 'patient' | 'pharmacist' | 'laboratorist' | 'accountant' | 'receptionist' | string ;

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  dashboardLayout: string[];
  defaultView: string;
  }

export interface User {
  id: string | number;
  name?: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialization?: string;
  department?: string;
  shift?: string;
  preferences?: UserPreferences;
}

export interface StatData {
  label: string;
  value: number | string;
  change?: number;
  icon?: any; // lucide-react Icon
  color?: string; // hex or css color
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName?: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  type: string;
  notes?: string;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  nextAppointment?: string;
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
  };
}

export interface Task {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueTime: string;
}

export interface NurseShift {
  id: string;
  ward: string;
  patients: number;
  startTime: string;
  endTime: string;
  tasks: Task[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  prescription: string[];
  followUp?: string;
}

