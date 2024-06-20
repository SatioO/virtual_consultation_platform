export type Patient = {
  userId: number;
  name: {
    givenName: string;
    familyName: string;
    middleName: string;
  };
};
