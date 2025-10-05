import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todo/todoReducer'
import userReducer from './user/userReducer'
import petReducer from './pet/petReducer'
import affirmationReducer from './affirmation/affirmationReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    pet: petReducer,
    affirmation: affirmationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
