import type { AppThunkDispatch, RootState } from '../models'
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

export interface InitialDashboardState extends DashboardState {
  isInitialProtectedRender: boolean
  isCredentialLoading: boolean
  isSessionError: boolean
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

export type DashboardActions = {
  fetchTodos: () => AppThunkDispatch
  addTodo: (name: string) => AppThunkDispatch
  deleteTodo: (id: string) => AppThunkDispatch
  reorderLocal: (from: number, to: number) => AppThunkDispatch
  reorderTodosBulk: (items: { id: string; order: number }[]) => AppThunkDispatch
}

export const mapDispatchToDashboardProps = (dispatch: AppThunkDispatch) => ({
  fetchTodos: () => dispatch(fetchTodosThunk()),
  addTodo: (name: string) => dispatch(addTodoThunk({ name })),
  deleteTodo: (id: string) => dispatch(deleteTodoThunk({ id })),
  reorderLocal: (from: number, to: number) =>
    dispatch(reorderLocal({ from, to })),
  reorderTodosBulk: (items: { id: string; order: number }[]) =>
    dispatch(reorderTodosBulkThunk({ items })),
})
