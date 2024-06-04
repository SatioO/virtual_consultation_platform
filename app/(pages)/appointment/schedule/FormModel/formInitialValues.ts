type StepOneForm = {
  category: string;
  speciality: string;
};

type StepTwoForm = {
  category: string;
  speciality: string;
  provider: number;
};

type StepThreeForm = {
  slot: string;
  provider: number;
};

export type AppointmentForm = StepOneForm & StepTwoForm & StepThreeForm;

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
