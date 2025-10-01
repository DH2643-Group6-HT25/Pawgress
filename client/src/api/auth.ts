const API_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:3001/users/login";

export async function login(email: string, password: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return res.json();
}

export async function signup(email: string, password: string, name: string) {
  const res = await fetch(
    import.meta.env.VITE_SERVER_URL.replace("/login", "/signup"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include",
    }
  );
  return res.json();
}
