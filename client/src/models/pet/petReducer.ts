import _ from 'lodash'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { petFeedingThunk, petInfoThunk, petTodoToFoodThunk } from './petThunks'

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
  isCurrentlyFeeding: boolean
  isPooDisplayed: boolean
  feedingError: string
  afterFeedingMessage: string
  isMessageDisplayed: boolean
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
  isCurrentlyFeeding: false,
  isPooDisplayed: false,
  feedingError: '',
  afterFeedingMessage: '',
  isMessageDisplayed: false,
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
    hidePoo(state) {
      state.isPooDisplayed = false
    },
    setPetFeedingError(state, action: PayloadAction<string>) {
      state.feedingError = action.payload
    },
    hideAfterFeedingMessage(state) {
      state.isMessageDisplayed = false
    },
    clearAfterFeedingMessage(state) {
      state.afterFeedingMessage = ''
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
      .addCase(petTodoToFoodThunk.fulfilled, (state, action) => {
        if (action?.payload != null) {
          const food = _.toSafeInteger(action?.payload)
          if (state.food < food) {
            state.food = food
          }
        }
      })
      .addCase(petFeedingThunk.pending, (state) => {
        state.isCurrentlyFeeding = true
      })
      .addCase(petFeedingThunk.fulfilled, (state, action) => {
        if (state.health == null || action.payload.health > state.health) {
          state.health = action.payload.health
        }
        if (action.payload.food < state.food) {
          state.food = action.payload.food
        }
        if (action.payload.health < state.maxHealth) {
          state.afterFeedingMessage = '+ Health'
        } else {
          state.afterFeedingMessage = 'Max Health ❤︎'
        }
        state.mood = action.payload.mood
        state.isCurrentlyFeeding = false
        state.isPooDisplayed = true
        state.isMessageDisplayed = true
      })
      .addCase(petFeedingThunk.rejected, (state) => {
        state.isCurrentlyFeeding = false
      })
  },
})

export const {
  petSubmissionFailed,
  startPetSubmission,
  petCreationSubmitted,
  setPetHealth,
  resetPet,
  hidePoo,
  clearAfterFeedingMessage,
  hideAfterFeedingMessage,
} = petSlice.actions
export default petSlice.reducer
