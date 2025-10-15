import type { Dispatch } from 'redux'
import { getStreak, updateStreak } from '../../api/streak'
import {
  setBasicStreakInfo,
  setStreakLoading,
  setIsStreakNewUser,
  setStreakError,
  type BasicStreakInfo,
} from './streakReducer'

const handleStreakAsync = async (
  apiCall: () => Promise<any>,
  dispatch: Dispatch,
  errorMessage: string
) => {
  dispatch(setStreakLoading(true))
  dispatch(setStreakError(null))

  try {
    const data = await apiCall()

    if (data && data.streak) {
      const basicInfo: BasicStreakInfo = {
        currentStreak: data.streak?.currentStreak || '',
        bestStreak: data.streak?.bestStreak || '',
        streakHistory: data.streak?.streakHistory || [],
      }
      dispatch(setBasicStreakInfo(basicInfo))
      if (
        !data.streak.streakHistory ||
        data.streak.streakHistory.length === 0
      ) {
        dispatch(setIsStreakNewUser(true))
      } else {
        dispatch(setIsStreakNewUser(false))
      }
      return
    }
    throw new Error('Invalid data from server')
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setStreakError(error.message))
    } else {
      dispatch(setStreakError(errorMessage))
    }
    dispatch(setStreakLoading(false))
  } finally {
    dispatch(setStreakLoading(false))
  }
}

export const fetchStreakThunk = () => async (dispatch: Dispatch) => {
  await handleStreakAsync(
    getStreak,
    dispatch,
    'Failed to fetch streak. Please try again.'
  )
}

export const updateStreakThunk = () => async (dispatch: Dispatch) => {
  await handleStreakAsync(
    updateStreak,
    dispatch,
    'Failed to update streak. Please try again.'
  )
}
