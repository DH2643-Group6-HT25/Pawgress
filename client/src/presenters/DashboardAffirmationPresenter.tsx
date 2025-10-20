import { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  mapStateToAffirmationProps,
  mapDispatchToAffirmationProps,
  type AffirmationState,
  type AffirmationDispatch,
} from '../maps/affirmationMap'
import DashboardAffirmationView from '../views/DashboardAffirmationView'

interface DashboardAffirmationPresenterProps
  extends AffirmationState,
    AffirmationDispatch {}

function DashboardAffirmationPresenter({
  affirmation,
  loading,
  error,
  categories,
  selectedCategory,
  fetchCategories,
  fetchRandomAffirmation,
  fetchAffirmationByCategory,
}: DashboardAffirmationPresenterProps) {
  const isInitialRender = useRef(true)

  // Fetch categories on initial render
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Fetch affirmations based on the selected category
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (selectedCategory === 'random') {
      fetchRandomAffirmation() // Fetch a random affirmation
    } else {
      fetchAffirmationByCategory(selectedCategory) // Fetch affirmation by category
    }
  }, [fetchRandomAffirmation, fetchAffirmationByCategory, selectedCategory])

  return (
    <DashboardAffirmationView
      affirmation={affirmation}
      selectedCategory={selectedCategory}
      setSelectedCategory={(category) =>
        category === 'random'
          ? fetchRandomAffirmation()
          : fetchAffirmationByCategory(category)
      }
      loading={loading}
      error={error}
      categories={categories}
    />
  )
}

export const DashboardAffirmation = connect(
  mapStateToAffirmationProps,
  mapDispatchToAffirmationProps
)(DashboardAffirmationPresenter)
