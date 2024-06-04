import { AppointmentForm } from '@/domain/appointment';
import appointmentFormModel from './appointmentFormModel';

const {
  formField: { category },
} = appointmentFormModel;

const formValues: AppointmentForm = {
  category: '',
  speciality: '',
  provider: 0,
  slot: '',
};

export default formValues;
