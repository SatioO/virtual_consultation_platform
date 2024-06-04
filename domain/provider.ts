import { Specialty } from "./speciality";

export type Provider = {
    userId: number;
    username: string;
    name: {
        givenName: string;
        familyName: string;
        middleName: string;
    };
    email: string;
    dob: string;
    roles: string[];
    administrativeSex: string;
    maritalStatus: string;
    status: string;
    npi: number;
    ssn: string;
    specialities: Specialty[];
};

export type Slot = {
    startDateTime: string;
    endDateTime: string;
    available: boolean;
};
