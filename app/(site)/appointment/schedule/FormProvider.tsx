import { AppointmentForm } from '@/domain/appointment';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export const FormContext = createContext<
  [AppointmentForm, Dispatch<SetStateAction<AppointmentForm>>] | null
>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<AppointmentForm>({
    category: '',
    speciality: '',
    provider: 0,
    slot: '',
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
