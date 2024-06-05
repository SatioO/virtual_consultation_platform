import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { AppointmentForm } from './FormModel/formInitialValues';

export const FormContext = createContext<
  [AppointmentForm, Dispatch<SetStateAction<AppointmentForm>>] | null
>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<AppointmentForm>({
    category: '',
    speciality: '',
    provider: 0,
    slot: '',
    administrativeSex: '',
    dob: '',
    email: '',
    maritalStatus: '',
    mrn: '',
    name: { familyName: '', middleName: '', givenName: '' },
    ssn: '',
  });

  return (
    <FormContext.Provider value={[formData, setFormData]}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormState must be used within the FormProvider');
  }
  return context;
}
