export type Patient = {
  userId: number;
  name: {
    givenName: string;
    familyName: string;
    middleName: string;
  };
  email: string;
  administrativeSex: string;
  mrn: string;
  status: string;
};
