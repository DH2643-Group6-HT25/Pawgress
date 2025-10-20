// client/src/models/todo/todoThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTodos,
  addTodo as apiAddTodo,
  deleteTodo as apiDeleteTodo,
  reorderTodos as apiReorderTodos,
  completeTodo,
} from '../../api/todo'
import type { TodoObject } from './type'

interface API_DATA {
  id: string
  _id?: string
  todo: string
  name: string
  text: string
  isDone: boolean
  done: boolean
  createdAt: string
  date: string
  doneAt: string
  order: string
}
const mapFromApi = (t: API_DATA): TodoObject => ({
  id: t.id ?? t._id,
  name: t.name ?? t.todo ?? t.text ?? '',
  isDone: Boolean(t.isDone ?? t.done ?? false),
  createdAt: t.createdAt
    ? Date.parse(t.createdAt)
    : t.date
      ? Date.parse(t.date)
      : Date.now(),
  doneAt: t.doneAt
    ? Date.parse(t.doneAt)
    : (t.isDone ?? t.done)
      ? Date.now()
      : 0,
  order: Number(t.order ?? 0),
})

export const fetchTodosThunk = createAsyncThunk<TodoObject[], void>(
  'todo/fetchAll',
  async () => {
    const list = await getTodos()
    const mapped = (Array.isArray(list) ? list : []).map(mapFromApi)
    return mapped.sort((a, b) => a.order - b.order)
  }
)

export const addTodoThunk = createAsyncThunk<TodoObject, { name: string }>(
  'todo/add',
  async ({ name }) => {
    const res = await apiAddTodo(name)

    return mapFromApi(res)
  }
)

export const deleteTodoThunk = createAsyncThunk<string, { id: string }>(
  'todo/delete',
  async ({ id }) => {
    await apiDeleteTodo(id)
    return id
  }
)

export const reorderTodosBulkThunk = createAsyncThunk<
  TodoObject[],
  { items: { id: string; order: number }[] }
>('todo/reorderBulk', async ({ items }) => {
  const data = await apiReorderTodos(items)
  const mapped = (Array.isArray(data) ? data : []).map(mapFromApi)
  return mapped.sort((a, b) => a.order - b.order)
})

export const completeTodoThunk = createAsyncThunk<string, { id: string }>(
  'todo/complete',
  async ({ id }) => {
    await completeTodo(id)
    return id
  }
)
