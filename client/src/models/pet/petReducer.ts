import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface BasicPetInfo {
  name: string | null
  color: string
}
interface PetState extends BasicPetInfo {
  health: number | null
  maxHealth: number
  loading: boolean
  error: string | null
}

const initialState: PetState = {
  name: null,
  color: 'black',
  health: null,
  maxHealth: 100,
  loading: false,
  error: null,
}

export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    startPetSubmission(state) {
      state.loading = true
      state.error = null
    },
    petCreationSubmitted(state, action: PayloadAction<BasicPetInfo>) {
      state.name = action.payload.name
      state.color = action.payload.color
      state.health = state.maxHealth
      state.loading = false
    },
    petSubmissionFailed(state, action: PayloadAction<string | null>) {
      state.error = action.payload
      state.loading = false
    },
    setInitialPetHealth(state) {
      state.health = state.maxHealth
    },
    setPetHealth(state, action: PayloadAction<number>) {
      state.health = action.payload
    },
    resetPet(state) {
      state.health = initialState.health
      state.maxHealth = initialState.maxHealth
      state.loading = initialState.loading
      state.error = initialState.error
    },
  },
})

export const {
  petSubmissionFailed,
  startPetSubmission,
  petCreationSubmitted,
  setPetHealth,
  resetPet,
} = petSlice.actions
export default petSlice.reducer
