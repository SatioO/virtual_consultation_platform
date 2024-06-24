import { Patient } from "@/domain/patient";

export async function patientFetcher(
  providerId: number,
  accessToken?: string
): Promise<Patient[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/providers/${providerId}/patients?page=0&size=5&sort=dateTime,desc`,
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
