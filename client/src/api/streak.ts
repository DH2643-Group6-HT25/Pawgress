export async function getStreak(userId: string) {
  const res = await fetch(`/?userId=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return res.json();
}

export async function updateStreak(userId: string) {
  const res = await fetch(`/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
    credentials: "include",
  });

  return res.json();
}
