import { createSlice } from '@reduxjs/toolkit'
import type { TodoObject } from './type'

interface TodoState {
  todoList: Array<TodoObject>
}

const initialState: TodoState = {
  todoList: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
})

export default todoSlice.reducer
