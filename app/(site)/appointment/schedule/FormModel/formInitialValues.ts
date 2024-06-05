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

type StepFourForm = {
  name: { familyName: string; givenName: string; middleName: string };
  email: string;
  dob: string;
  administrativeSex: string;
  maritalStatus: string;
  mrn: string;
  ssn: string;
};

export type AppointmentForm = StepOneForm &
  StepTwoForm &
  StepThreeForm &
  StepFourForm;

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

export const stepFourFormValues: StepFourForm = {
  name: { familyName: '', middleName: '', givenName: '' },
  email: '',
  dob: '',
  administrativeSex: '',
  maritalStatus: '',
  mrn: '',
  ssn: '',
};
