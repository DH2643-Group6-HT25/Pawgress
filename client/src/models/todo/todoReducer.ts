import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' 
import type { TodoObject } from "./type";
import {
  addTodoThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  reorderTodosBulkThunk,
} from "./todoThunks";

interface TodoState {
  todoList: TodoObject[];
  loading: boolean;
  error?: string;
}

const initialState: TodoState = {
  todoList: [],
  loading: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    
    reorderLocal(state, action: PayloadAction<{ from: number; to: number }>) {
      const arr = state.todoList.slice();
      const [moved] = arr.splice(action.payload.from, 1);
      arr.splice(action.payload.to, 0, moved);
      state.todoList = arr.map((t, i) => ({ ...t, order: i }));
    },
  },
  extraReducers: (b) => {
    // FETCH
    b.addCase(fetchTodosThunk.pending, (s) => {
      s.loading = true;
      s.error = undefined;
    });
    b.addCase(fetchTodosThunk.fulfilled, (s, a) => {
      s.loading = false;
      s.todoList = a.payload;
    });
    b.addCase(fetchTodosThunk.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message;
    });

    // ADD
    b.addCase(addTodoThunk.fulfilled, (s, a) => {
      s.todoList.push(a.payload);
      s.todoList.sort((x, y) => x.order - y.order);
    });

    // DELETE
    b.addCase(deleteTodoThunk.fulfilled, (s, a) => {
      s.todoList = s.todoList.filter((t) => t.id !== a.payload);
    });

    // BULK REORDER (server truth)
    b.addCase(reorderTodosBulkThunk.fulfilled, (s, a) => {
      s.todoList = a.payload;
    });
  },
});

export const { reorderLocal } = todoSlice.actions;
export default todoSlice.reducer;
