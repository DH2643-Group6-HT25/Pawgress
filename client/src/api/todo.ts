export async function getTodos(userId: string) {
  const res = await fetch(`/todo?userId=${userId}`);
  return res.json();
}

export async function addTodo(todo: string, user: string) {
  const res = await fetch('/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo, user }),
  });
  return res.json();
}

export async function deleteTodo(id: string) {
  const res = await fetch(`/todo/${id}`, { method: 'DELETE' });
  return res.json();
}