import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AffirmationState {
  selectedCategory: string
  categoryList: Array<string>
  affirmationText: string | null
  lastFetch: number | null
  loading: boolean
  error: string | null
}

const initialState: AffirmationState = {
  selectedCategory: 'random',
  categoryList: [],
  affirmationText: null,
  lastFetch: null,
  loading: false,
  error: null,
}

export const affirmationSlice = createSlice({
  name: 'affirmation',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categoryList = action.payload
    },
    setAffirmation(state, action: PayloadAction<string>) {
      state.affirmationText = action.payload
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const {
  setCategories,
  setAffirmation,
  setSelectedCategory,
  setLoading,
  setError,
} = affirmationSlice.actions
export default affirmationSlice.reducer
