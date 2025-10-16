import type { AppThunkDispatch, RootState } from '../models'
import { createPetThunk } from '../models/pet/petThunks'
import { userVerifyThunk } from '../models/user/userThunks'

export interface OnboardingState {
  petName: string
  petColor: string
  isLoading: boolean
  petError: string | null
}

export interface InitialOnboardingState extends OnboardingState {
  isInitialProtectedRender: boolean
  isCredentialLoading: boolean
}

export function mapStateToOnboardingProps(
  state: RootState
): InitialOnboardingState {
  return {
    petName: state.pet.name ?? '',
    petColor: state.pet.color,
    isLoading: state.pet.loading,
    petError: state.pet.error,
    isInitialProtectedRender: state.user.isInitialProtectedRender,
    isCredentialLoading: state.user.isCredentialLoading,
  }
}

export interface OnboardingDispatch {
  submitPetInfoACB: CallableFunction
}

export interface InitialOnboardingDispatch extends OnboardingDispatch {
  verifyUserACB: CallableFunction
}

export function mapDispatchToOnboardingProps(
  dispatch: AppThunkDispatch
): InitialOnboardingDispatch {
  return {
    submitPetInfoACB(name: string, color: string) {
      dispatch(createPetThunk(name, color))
    },
    verifyUserACB() {
      dispatch(userVerifyThunk())
    },
  }
}
