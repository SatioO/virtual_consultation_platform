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
