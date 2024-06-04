import { StepOneForm, StepThreeForm, StepTwoForm } from '@/domain/appointment';

export const stepOneFormValues: StepOneForm = {
  category: '',
  speciality: '',
};

export const stepTwoFormValues: StepTwoForm = {
  category: '',
  speciality: '',
  provider: 0,
};

export const stepThreeFormValues: StepThreeForm = {
  slot: '',
  provider: 0,
};
