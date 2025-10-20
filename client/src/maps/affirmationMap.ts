import type { AppThunkDispatch, RootState } from '../models'
import {
  fetchCategoriesThunk,
  fetchAffirmationThunk,
  fetchAffirmationByCategoryThunk,
} from '../models/affirmation/affirmationThunks'

export interface AffirmationState {
  affirmation: string | null
  loading: boolean
  error: string | null
  categories: string[]
  selectedCategory: string
}

export interface AffirmationDispatch {
  fetchCategories: () => void
  fetchRandomAffirmation: () => void
  fetchAffirmationByCategory: (category: string) => void
}

export function mapStateToAffirmationProps(state: RootState): AffirmationState {
  return {
    affirmation: state.affirmation.affirmationText,
    loading: state.affirmation.loading,
    error: state.affirmation.error,
    categories: state.affirmation.categoryList,
    selectedCategory: state.affirmation.selectedCategory,
  }
}

export function mapDispatchToAffirmationProps(
  dispatch: AppThunkDispatch
): AffirmationDispatch {
  return {
    fetchCategories: () => dispatch(fetchCategoriesThunk()),
    fetchRandomAffirmation: () => dispatch(fetchAffirmationThunk()),
    fetchAffirmationByCategory: (category: string) =>
      dispatch(fetchAffirmationByCategoryThunk(category)),
  }
}
