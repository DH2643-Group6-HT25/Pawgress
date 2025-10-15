import type { RootState } from '../models'
import type { TodoObject } from '../models/todo/type'
import {
  fetchTodosThunk,
  addTodoThunk,
  deleteTodoThunk,
  reorderTodosBulkThunk,
} from '../models/todo/todoThunks'
import { reorderLocal } from '../models/todo/todoReducer'

export interface DashboardState {
  todos: TodoObject[]
  currentUser: string
  petName: string
  petHealth: number
  petColor: string | null
  loading: boolean
}

export function mapStateToDashboardProps(state: RootState): DashboardState {
  return {
    todos: state.todo.todoList,
    currentUser: state.user.userID ?? '',
    petName: state.pet.name ?? 'PetName',
    petHealth: state.pet.health ?? 0,
    petColor: state.pet.color,
    loading: state.todo.loading ?? false,
  }
}

export const mapDispatchToDashboardProps = (dispatch: any) => ({
  fetchTodos: () => dispatch(fetchTodosThunk()),
  addTodo: (name: string) => dispatch(addTodoThunk({ name })),
  deleteTodo: (id: string) => dispatch(deleteTodoThunk({ id })),
  reorderLocal: (from: number, to: number) => dispatch(reorderLocal({ from, to })),
  reorderTodosBulk: (items: { id: string; order: number }[]) =>
    dispatch(reorderTodosBulkThunk({ items })),
})
