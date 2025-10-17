import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { StreakHistoryObject } from './streakType'

export interface BasicStreakInfo {
  currentStreak: number
  bestStreak: number
  streakHistory: Array<StreakHistoryObject>
}

interface StreakState extends BasicStreakInfo {
  loading: boolean
  isStreakNewUser: boolean
  error: string | null
}

// fake data to test
const initialState: StreakState = {
  currentStreak: 0,
  bestStreak: 0,
  streakHistory: [],
  loading: false,
  isStreakNewUser: true,
  error: null,
}

export const streakSlice = createSlice({
  name: 'streak',
  initialState,
  reducers: {
    setBasicStreakInfo: (state, action: PayloadAction<BasicStreakInfo>) => {
      state.currentStreak = action.payload.currentStreak
      state.bestStreak = action.payload.bestStreak
      state.streakHistory = action.payload.streakHistory
    },
    setStreakLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setIsStreakNewUser(state, action: PayloadAction<boolean>) {
      state.isStreakNewUser = action.payload
    },
    setStreakError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export default streakSlice.reducer
export const {
  setStreakLoading,
  setIsStreakNewUser,
  setStreakError,
  setBasicStreakInfo,
} = streakSlice.actions
