import { AppointmentForm } from '@/app/(site)/appointment/schedule/FormModel/formInitialValues';
import { formatInTimeZone } from 'date-fns-tz/formatInTimeZone';

export async function createOpenAppointment(
  values: AppointmentForm
): Promise<number> {
  const payload = {
    dateTime: formatInTimeZone(
      new Date(values.slot),
      'UTC',
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    ),
    providerId: values.provider,
    specialityId: parseInt(values.speciality),
    patientDetails: {
      mrn: values.mrn,
      ssn: values.ssn,
      name: values.name,
      email: values.email,
      dob: formatInTimeZone(values.dob, 'UTC', "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
      administrativeSex: values.administrativeSex,
      maritalStatus: values.maritalStatus,
      addresses: [],
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/appointments`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  return response.status;
}

export async function createAppointment(
  values: AppointmentForm,
  accessToken?: string
): Promise<number> {
  const payload = {
    dateTime: formatInTimeZone(
      new Date(values.slot),
      'UTC',
      "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    ),
    providerId: values.provider,
    specialityId: parseInt(values.speciality),
    patientId: values.patient,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/appointments`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.status;
}


