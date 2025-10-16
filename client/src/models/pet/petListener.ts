import { createListenerMiddleware } from '@reduxjs/toolkit'
import { petCreationSubmitted } from './petReducer'
import navigationService from '../../utils/navigationService'
import { setPetOwned } from '../user/userReducer'

export const petListenerMiddleware = createListenerMiddleware()

petListenerMiddleware.startListening({
  actionCreator: petCreationSubmitted,
  effect: async function petCreationEffectACB(_, listenerApi) {
    listenerApi.dispatch(setPetOwned())
    navigationService.navigateTo('/dashboard')
  },
})
