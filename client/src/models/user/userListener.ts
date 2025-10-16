import { createListenerMiddleware } from '@reduxjs/toolkit'
import { userVerifyThunk } from './userThunks'
import navigationService from '../../utils/navigationService'

export const userListenerMiddleware = createListenerMiddleware()

userListenerMiddleware.startListening({
  actionCreator: userVerifyThunk.rejected,
  effect: function userVerifyRejectEffectACB() {
    navigationService.navigateTo('/')
  },
})
