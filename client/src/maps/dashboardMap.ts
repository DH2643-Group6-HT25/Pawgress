import type { AppThunkDispatch, RootState } from '../models'
import type { TodoObject } from '../models/todo/type'
import {
  fetchTodosThunk,
  addTodoThunk,
  deleteTodoThunk,
  reorderTodosBulkThunk,
  completeTodoThunk,
} from '../models/todo/todoThunks'
import { fetchStreakThunk } from '../models/streak/streakThunks'

import { reorderLocal } from '../models/todo/todoReducer'
import { petFeedingThunk, petInfoThunk } from '../models/pet/petThunks'
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
  isCurrentlyFeeding: boolean
  isPooDisplayed: boolean
  afterFeedingMessage: string
  isAfterFeedingMessageDisplayed: boolean
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
    isCurrentlyFeeding: state.pet.isCurrentlyFeeding,
    isPooDisplayed: state.pet.isPooDisplayed,
    afterFeedingMessage: state.pet.afterFeedingMessage,
    isAfterFeedingMessageDisplayed: state.pet.isMessageDisplayed,
  }
}

export interface DashboardActions {
  addTodo: (name: string) => void
  deleteTodo: (id: string) => void
  completeTodo: (id: string) => void
  reorderLocal: (from: number, to: number) => void
  reorderTodosBulk: (items: { id: string; order: number }[]) => void
  feedPet: CallableFunction
}

export interface InitialDashboardActions extends DashboardActions {
  verifyUser: CallableFunction
  fetchPetInfo: CallableFunction
  fetchTodos: CallableFunction
}

export function mapDispatchToDashboardProps(
  dispatch: AppThunkDispatch
): InitialDashboardActions {
  return {
    fetchTodos: () => dispatch(fetchTodosThunk()),
    addTodo: (name: string) => dispatch(addTodoThunk({ name })),
    deleteTodo: (id: string) => dispatch(deleteTodoThunk({ id })),
    completeTodo: async (id: string) => {
      await dispatch(completeTodoThunk({ id }))
      dispatch(fetchStreakThunk())
    },
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
    feedPet() {
      dispatch(petFeedingThunk())
    },
  }
}
