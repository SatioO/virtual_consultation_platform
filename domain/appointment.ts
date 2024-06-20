import { Patient } from '@/services/patient';
import { Specialty } from './speciality';

export type Appointment = {
  id: number;
  dateTime: string;
  patient: Patient;
  speciality: Specialty
  status: string;
};
