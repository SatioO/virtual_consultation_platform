import { Appointment } from '@/domain/appointment';
import { Provider, Slot } from '@/domain/provider';

export async function providerFetcher(
  specialtyId: string
): Promise<Provider[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/specialities/${specialtyId}/providers`
  );
  const data = response.json();
  return data;
}

export async function slotsFetcher(
  providerId: number,
  date: string
): Promise<Slot[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/providers/${providerId}/slots?date=${date}`
  );
  const data = response.json();
  return data;
}

export async function appointmentsFetcher(
  providerId: number,
  accessToken?: string
): Promise<Appointment[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/providers/${providerId}/appointments?page=0&size=5`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = response.json();
  return data;
}

export async function allAppointmentsFetcher(
  providerId: number,
  accessToken?: string
): Promise<Appointment[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/providers/${providerId}/appointments?page=0&size=100`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = response.json();
  return data;
}
