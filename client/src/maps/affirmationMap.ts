import type { RootState } from "../models";
import { fetchAffirmationThunk } from "../models/affirmation/affirmationThunks";

export function mapStateToAffirmationProps(state: RootState) {
  return {
    affirmation: state.affirmation.affirmationText,
    loading: state.affirmation.loading,
    error: state.affirmation.error,
  };
}

export function mapDispatchToAffirmationProps(dispatch: any) {
  return {
    fetchAffirmation: () => dispatch(fetchAffirmationThunk()),
  };
}
