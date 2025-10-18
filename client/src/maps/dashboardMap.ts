import type { AppThunkDispatch, RootState } from '../models'
import type { TodoObject } from '../models/todo/type'
import {
  fetchTodosThunk,
  addTodoThunk,
  deleteTodoThunk,
  reorderTodosBulkThunk,
  completeTodoThunk,
} from '../models/todo/todoThunks'

import { reorderLocal } from '../models/todo/todoReducer'
import { petInfoThunk } from '../models/pet/petThunks'
import { userVerifyThunk } from '../models/user/userThunks'

export interface DashboardState {
  todos: TodoObject[]
  currentUser: string
  petName: string
  petHealth: number
  petColor: string | null
  petMood: string
  food: number
  loading: boolean
  isPetLoading: boolean
  currentStreak: number
}

export interface InitialDashboardState extends DashboardState {
  isPageLoading: boolean
}

export function mapStateToDashboardProps(
  state: RootState
): InitialDashboardState {
  return {
    todos: state.todo.todoList,
    currentUser: state.user.userID ?? '',
    petName: state.pet.name ?? '',
    petHealth: state.pet.health ?? 0,
    petColor: state.pet.color,
    petMood: state.pet.mood,
    food: state.pet.food,
    loading: state.todo.loading ?? false,
    isPageLoading: state.user.isCredentialLoading,
    isPetLoading: state.pet.loading,
    currentStreak: state.streak.currentStreak,
  }
}

export interface DashboardActions {
  fetchTodos: CallableFunction
  addTodo: (name: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
  reorderLocal: (from: number, to: number) => void
  reorderTodosBulk: (items: { id: string; order: number }[]) => void
}

export interface InitialDashboardActions extends DashboardActions {
  verifyUser: CallableFunction
  fetchPetInfo: CallableFunction
}

export function mapDispatchToDashboardProps(
  dispatch: AppThunkDispatch
): InitialDashboardActions {
  return {
    fetchTodos: () => dispatch(fetchTodosThunk()),
    addTodo: (name: string) => dispatch(addTodoThunk({ name })),
    deleteTodo: (id: string) => dispatch(deleteTodoThunk({ id })),
    completeTodo: (id: string) => dispatch(completeTodoThunk({ id })),
    reorderLocal: (from: number, to: number) =>
      dispatch(reorderLocal({ from, to })),
    reorderTodosBulk: (items: { id: string; order: number }[]) =>
      dispatch(reorderTodosBulkThunk({ items })),
    fetchPetInfo() {
      dispatch(petInfoThunk())
    },
    verifyUser() {
      dispatch(userVerifyThunk())
    },
  }
}
