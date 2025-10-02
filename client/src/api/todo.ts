export async function getTodos(userId: string) {
  const res = await fetch(`/todo?userId=${userId}`);
  return res.json();
}

export async function addTodo(todo: string, user: string) {
  const res = await fetch("/todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo, user }),
  });
  return res.json();
}

export async function deleteTodo(id: string) {
  const res = await fetch(`/todo/${id}`, { method: "DELETE" });
  return res.json();
}

export async function updateTodo(
  id: string,
  data: { todo?: string; done?: boolean }
) {
  const res = await fetch(`/todo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTodoOrder(id: string, order: number) {
  const res = await fetch(`/todo/${id}/order`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order }),
  });
  return res.json();
}
