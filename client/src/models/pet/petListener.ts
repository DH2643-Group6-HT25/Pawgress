import { createListenerMiddleware } from '@reduxjs/toolkit'
import {
  clearAfterFeedingMessage,
  hideAfterFeedingMessage,
  hidePoo,
  petCreationSubmitted,
} from './petReducer'
import navigationService from '../../utils/navigationService'
import {
  setLoginSuccess,
  setPetOwned,
  setSessionError,
} from '../user/userReducer'
import { petFeedingThunk, petInfoThunk } from './petThunks'
import { setCurrentStreak } from '../streak/streakReducer'

export const petListenerMiddleware = createListenerMiddleware()

petListenerMiddleware.startListening({
  actionCreator: petCreationSubmitted,
  effect: async function petCreationEffectACB(_, listenerApi) {
    listenerApi.dispatch(setPetOwned())
    navigationService.navigateTo('/dashboard')
  },
})

petListenerMiddleware.startListening({
  actionCreator: petInfoThunk.rejected,
  effect: async function petInfoRejectedEffectACB(action, listenerApi) {
    if (action.payload == 'No Pet Info Found') {
      navigationService.navigateTo('/onboarding')
    } else {
      listenerApi.dispatch(setSessionError())
      navigationService.navigateTo('/login')
    }
  },
})

petListenerMiddleware.startListening({
  actionCreator: petInfoThunk.fulfilled,
  effect: async function petInfoFulfilledEffect(action, listenerApi) {
    listenerApi.dispatch(setCurrentStreak(action.payload.currentStreak))
    listenerApi.dispatch(setPetOwned())
    listenerApi.dispatch(setLoginSuccess())
  },
})

petListenerMiddleware.startListening({
  actionCreator: petFeedingThunk.fulfilled,
  effect: async function petFeedingFulfilledEffect(_, listenerApi) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    listenerApi.dispatch(hideAfterFeedingMessage())

    await new Promise((resolve) => setTimeout(resolve, 1000))
    listenerApi.dispatch(hidePoo())
    listenerApi.dispatch(clearAfterFeedingMessage())
  },
})
