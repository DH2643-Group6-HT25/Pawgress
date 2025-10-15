import {
  configureStore,
  type Action,
  type ThunkDispatch,
} from '@reduxjs/toolkit'
import todoReducer from './todo/todoReducer'
import userReducer from './user/userReducer'
import petReducer from './pet/petReducer'
import streakReducer from './streak/streakReducer'
import affirmationReducer from './affirmation/affirmationReducer'
import { petListenerMiddleware } from './pet/petListener'

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    pet: petReducer,
    streak: streakReducer,
    affirmation: affirmationReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().prepend(petListenerMiddleware.middleware)
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action>
