// client/src/models/todo/todoThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTodos,
  addTodo as apiAddTodo,
  deleteTodo as apiDeleteTodo,
  reorderTodos as apiReorderTodos,
} from '../../api/todo'
import type { TodoObject } from './type'

const mapFromApi = (t: any): TodoObject => ({
  id: t.id ?? t._id,
  name: t.name ?? t.todo ?? t.text ?? '',
  isDone: Boolean(t.isDone ?? t.done ?? false),
  createdAt: t.createdAt ? Date.parse(t.createdAt) : t.date ? Date.parse(t.date) : Date.now(),
  doneAt: t.doneAt ? Date.parse(t.doneAt) : (t.isDone ?? t.done) ? Date.now() : 0,
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
  "todo/add",
  async ({ name }) => {
    console.log("THUNK addTodo →", name);
    const res = await apiAddTodo(name);
    console.log("THUNK addTodo OK ←", res);
    return mapFromApi(res);
  }
);


export const deleteTodoThunk = createAsyncThunk<string, { id: string }>(
  'todo/delete',
  async ({ id }) => { await apiDeleteTodo(id); return id }
)

export const reorderTodosBulkThunk = createAsyncThunk<TodoObject[], { items: { id: string; order: number }[] }>(
  'todo/reorderBulk',
  async ({ items }) => {
    const data = await apiReorderTodos(items)
    const mapped = (Array.isArray(data) ? data : []).map(mapFromApi)
    return mapped.sort((a, b) => a.order - b.order)
  }
)
