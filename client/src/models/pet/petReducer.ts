import { createSlice } from '@reduxjs/toolkit'

interface PetState {
  name: string | null
  color: string
  health: number | null
  maxHealth: number
}

const initialState: PetState = {
  name: null,
  color: '#000',
  health: null,
  maxHealth: 100,
}

export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {},
})

export default petSlice.reducer
