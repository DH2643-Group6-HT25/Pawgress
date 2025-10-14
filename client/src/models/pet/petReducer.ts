import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface BasicPetInfo {
  name: string | null
  color: string | null
}
interface PetState extends BasicPetInfo {
  health: number | null
  maxHealth: number
  loading: boolean
  error: string | null
}

const initialState: PetState = {
  name: null,
  color: null,
  health: null,
  maxHealth: 100,
  loading: false,
  error: null,
}

export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setPetLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setPetError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setInitialPetInfo(state, action: PayloadAction<BasicPetInfo>) {
      state.name = action.payload.name
      state.color = action.payload.color
      state.health = state.maxHealth
    },
    setInitialPetHealth(state) {
      state.health = state.maxHealth
    },
    setPetHealth(state, action: PayloadAction<number>) {
      state.health = action.payload
    },
  },
})

export const {
  setPetLoading,
  setPetError,
  setInitialPetInfo,
  setInitialPetHealth,
  setPetHealth,
} = petSlice.actions
export default petSlice.reducer
