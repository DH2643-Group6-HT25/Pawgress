import { createSlice } from '@reduxjs/toolkit'

interface AffirmationState {
  selectedCategory: string
  categoryList: Array<string>
  affirmationText: string | null
  lastFetch: number | null
}

const initialState: AffirmationState = {
  selectedCategory: 'random',
  categoryList: [],
  affirmationText: null,
  lastFetch: null,
}

export const affirmationSlice = createSlice({
  name: 'affirmation',
  initialState,
  reducers: {},
})

export default affirmationSlice.reducer
