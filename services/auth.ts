export async function login(username: string, password: string): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  const data = response.json();
  return data;
}
