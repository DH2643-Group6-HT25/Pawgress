import type { Dispatch } from '@reduxjs/toolkit'
import {
  fetchCategories,
  fetchAffirmation,
  fetchAffirmationByCategory,
} from '../../api/affirmation'
import {
  setCategories,
  setAffirmation,
  setError,
  setLoading,
} from './affirmationReducer'

// Thunk to fetch categories
export const fetchCategoriesThunk = () => async (dispatch: Dispatch) => {
  try {
    const data = await fetchCategories()
    dispatch(setCategories(data))
  } catch (err: any) {
    console.error('Failed to fetch categories:', err)
    dispatch(setError('Failed to fetch categories.'))
  }
}

// Thunk to fetch a random affirmation
export const fetchAffirmationThunk = () => async (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  dispatch(setError(null))
  try {
    const data = await fetchAffirmation()
    dispatch(setAffirmation(data.text))
  } catch (err: any) {
    console.error('Failed to fetch affirmation:', err)
    dispatch(setError('Failed to fetch affirmation. Please try again.'))
  } finally {
    dispatch(setLoading(false))
  }
}

// Thunk to fetch an affirmation by category
export const fetchAffirmationByCategoryThunk =
  (category: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const data = await fetchAffirmationByCategory(category)
      dispatch(setAffirmation(data.text))
    } catch (err: any) {
      console.error('Failed to fetch affirmation by category:', err)
      dispatch(setError('Failed to fetch affirmation. Please try again.'))
    } finally {
      dispatch(setLoading(false))
    }
  }
