import type { RootState } from '../models'

export function mapStateToAffirmationProps(state: RootState) {
  return {
    affirmation: state.affirmation.affirmationText,
    loading: state.affirmation.loading,
    error: state.affirmation.error,
  }
}
