export type StepOneForm = {
  category: string;
  speciality: string;
};

export type StepTwoForm = {
  category: string;
  speciality: string;
  provider: number;
};

export type StepThreeForm = {
  slot: string;
  provider: number;
};

export type AppointmentForm = StepOneForm & StepTwoForm & StepThreeForm;
