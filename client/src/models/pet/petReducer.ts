import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { petInfoThunk } from './petThunks'

export interface BasicPetInfo {
  name: string | null
  color: string
}
interface PetState extends BasicPetInfo {
  health: number | null
  mood: string
  food: number
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
  mood: 'normal',
  food: 0,
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
  extraReducers: (builder) => {
    builder
      .addCase(petInfoThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(petInfoThunk.fulfilled, (state, action) => {
        state.loading = false
        state.name = action.payload?.name || ''
        state.color = action.payload?.color || state.color
        state.health = action.payload.health
        state.mood = action.payload?.mood || state.mood
        state.food = action.payload.food
      })
      .addCase(petInfoThunk.rejected, (state) => {
        state.loading = false
      })
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
