import type { RootState, AppDispatch } from '../models'
import type { TodoObject } from '../models/todo/type'
import { mapDispatchToStreakProps } from '../maps/streakMap'

export interface DashboardState {
  todos: Array<TodoObject>
  currentUser: string
  petName: string
  petHealth: number
  petColor: string | null
}

export function mapStateToDashboardProps(state: RootState): DashboardState {
  return {
    todos: state.todo.todoList,
    currentUser: state.user.userID ?? '',
    petName: state.pet.name ?? 'PetName',
    petHealth: state.pet.health ?? 0,
    petColor: state.pet.color,
  }
}

export interface DashboardDispatch {
  updateStreakTestACB: CallableFunction
  getStreakTestACB: CallableFunction
}

export function mapDispatchToDashboardProps(
  dispatch: AppDispatch
): DashboardDispatch {
  const streakDispatch = mapDispatchToStreakProps(dispatch)
  return {
    updateStreakTestACB() {
      streakDispatch.updateStreakACB()
    },
    getStreakTestACB() {
      streakDispatch.getStreakACB()
    },
  }
}
