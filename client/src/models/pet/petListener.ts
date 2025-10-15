import { createListenerMiddleware } from '@reduxjs/toolkit'
import { petCreationSubmitted } from './petReducer'
import navigationService from '../../utils/navigationService'

export const petListenerMiddleware = createListenerMiddleware()

petListenerMiddleware.startListening({
  actionCreator: petCreationSubmitted,
  effect: async function petCreationEffectACB() {
    navigationService.navigateTo('/dashboard')
  },
})
