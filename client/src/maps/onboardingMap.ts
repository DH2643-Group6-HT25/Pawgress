import type { AppThunkDispatch, RootState } from '../models'
import { createPetThunk } from '../models/pet/petThunks'

export interface OnboardingState {
  petName: string
  petColor: string
  isLoading: boolean
  petError: string | null
}

export function mapStateToOnboardingProps(state: RootState): OnboardingState {
  return {
    petName: state.pet.name ?? '',
    petColor: state.pet.color,
    isLoading: state.pet.loading,
    petError: state.pet.error,
  }
}

export interface OnboardingDispatch {
  submitPetInfoACB: CallableFunction
}

export function mapDispatchToOnboardingProps(
  dispatch: AppThunkDispatch
): OnboardingDispatch {
  return {
    submitPetInfoACB(name: string, color: string) {
      dispatch(createPetThunk(name, color))
    },
  }
}
