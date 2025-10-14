import type { AppDispatch, RootState } from '../models'
import { createPetThunk } from '../models/pet/petThunks'

export interface OnboardingState {
  petName: string
  petColor: string | null
  isLoading: boolean
}

export function mapStateToOnboardingProps(state: RootState): OnboardingState {
  return {
    petName: state.pet.name ?? '',
    petColor: state.pet.color,
    isLoading: state.pet.loading,
  }
}

export interface OnboardingDispatch {
  submitPetInfoACB: CallableFunction
}

export function mapDispatchToOnboardingProps(
  dispatch: AppDispatch
): OnboardingDispatch {
  return {
    submitPetInfoACB(name: string, color: string) {
      dispatch(createPetThunk(name, color))
    },
  }
}
