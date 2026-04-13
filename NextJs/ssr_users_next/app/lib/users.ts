export async function getAllUsers(): Promise<any> {
  const res = await fetch(`${process.env.API_BASE_URL}/users`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    return null;
  }

  return await res.json();
}

export async function getUser(id: string): Promise<any> {
  const res = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data;
}
