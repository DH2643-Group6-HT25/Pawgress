import { INTERNAL_API_URL } from './config'

export async function getTodos() {
  const r = await fetch(`${INTERNAL_API_URL}/todo`, { credentials: 'include' })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function addTodo(name: string) {
  const r = await fetch(`${INTERNAL_API_URL}/todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ todo: name }),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function deleteTodo(id: string) {
  const r = await fetch(`${INTERNAL_API_URL}/todo/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!r.ok) throw new Error(await r.text())
}

export async function reorderTodos(items: { id: string; order: number }[]) {
  const r = await fetch(`${INTERNAL_API_URL}/todo/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ items }),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}
