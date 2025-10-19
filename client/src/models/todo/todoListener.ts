import { createListenerMiddleware } from '@reduxjs/toolkit'
import { completeTodoThunk } from './todoThunks'
import { petTodoToFoodThunk } from '../pet/petThunks'

export const todoListenerMiddleware = createListenerMiddleware()

todoListenerMiddleware.startListening({
  actionCreator: completeTodoThunk.fulfilled,
  effect: async function completeTodoFulfilled(_, listenerApi) {
    listenerApi.dispatch(petTodoToFoodThunk())
  },
})
