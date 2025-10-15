const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function getTodos() {
  const r = await fetch(`${BASE}/todo`, { credentials: "include" });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function addTodo(name: string) {
  console.log("API addTodo →", name);
  const r = await fetch(`${BASE}/todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ todo: name }),
  });
  console.log("API addTodo status ←", r.status);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function deleteTodo(id: string) {
  const r = await fetch(`${BASE}/todo/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!r.ok) throw new Error(await r.text());
}

export async function reorderTodos(items: { id: string; order: number }[]) {
  const r = await fetch(`${BASE}/todo/reorder`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ items }),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
