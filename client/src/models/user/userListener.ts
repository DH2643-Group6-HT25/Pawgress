import { createListenerMiddleware } from '@reduxjs/toolkit'
import { userLoginThunk, userLogoutThunk, userVerifyThunk } from './userThunks'
import navigationService from '../../utils/navigationService'
import { clearSessionError, setSessionError } from './userReducer'
import type { RootState } from '..'
import { resetPet } from '../pet/petReducer'

export const userListenerMiddleware = createListenerMiddleware()

userListenerMiddleware.startListening({
  actionCreator: userVerifyThunk.rejected,
  effect: function userVerifyRejectEffect(_, listenerApi) {
    listenerApi.dispatch(setSessionError())
    navigationService.navigateTo('/login')
  },
})

userListenerMiddleware.startListening({
  actionCreator: userLogoutThunk.fulfilled,
  effect: function userVerifyRejectEffect(_, listenerApi) {
    listenerApi.dispatch(resetPet())
    navigationService.navigateTo('')
  },
})

userListenerMiddleware.startListening({
  actionCreator: userLoginThunk.fulfilled,
  effect: function userLoginFulfilledEffect(_, listenerApi) {
    const {
      user: { sessionError, hasPet },
    }: RootState = listenerApi.getState() as RootState

    if (sessionError !== null) {
      listenerApi.dispatch(clearSessionError())
    }

    if (hasPet) {
      navigationService.navigateTo('/dashboard')
    }
  },
})
