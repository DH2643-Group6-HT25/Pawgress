import type { RootState, AppThunkDispatch } from '../models'
import {
  fetchStreakThunk,
  updateStreakThunk,
} from '../models/streak/streakThunks'
import type { StreakHistoryObject } from '../models/streak/streakType'

export interface StreakState {
  currentStreak: number
  bestStreak: number
  streakHistory: Array<StreakHistoryObject>
  isLoading: boolean
  isStreakNewUser: boolean
  error: string | null
}

export function mapStateToDashboardHistoryProps(state: RootState): StreakState {
  return {
    currentStreak: state.streak.currentStreak,
    bestStreak: state.streak.bestStreak,
    streakHistory: state.streak.streakHistory,
    isLoading: state.streak.loading,
    isStreakNewUser: state.streak.isStreakNewUser,
    error: state.streak.error,
  }
}

export interface StreakDispatch {
  getStreakACB: CallableFunction
  updateStreakACB: CallableFunction
}

export function mapDispatchToStreakProps(
  dispatch: AppThunkDispatch
): StreakDispatch {
  return {
    getStreakACB() {
      dispatch(fetchStreakThunk())
    },
    updateStreakACB() {
      dispatch(updateStreakThunk())
    },
  }
}
