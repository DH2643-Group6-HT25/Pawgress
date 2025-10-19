import { useEffect, useState, useRef } from 'react'
import DashboardAffirmationView from '../views/DashboardAffirmationView'
import {
  fetchAffirmation,
  fetchCategories,
  fetchAffirmationByCategory,
} from '../api/affirmation'

function DashboardAffirmationPresenter() {
  const [affirmation, setAffirmation] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([]) // State for categories
  const [selectedCategory, setSelectedCategory] = useState<string>('random') // State for selected category
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Ref to track if the fetch has already been called
  const isInitialRender = useRef(true)

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await fetchCategories() // Fetch categories from the API
        setCategories(data) // Assuming the API returns an array of categories
      } catch (err: any) {
        console.error('Failed to fetch categories:', err)
      }
    }

    fetchCategoryData()
  }, [])

  // Fetch affirmation when the selected category changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let data
        if (selectedCategory === 'random') {
          data = await fetchAffirmation() // Fetch random affirmation
        } else {
          data = await fetchAffirmationByCategory(selectedCategory) // Fetch affirmation by category
        }
        setAffirmation(data.text) // Assuming the API returns { text: "..." }
      } catch (err: any) {
        setError('Failed to fetch affirmation. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    // Skip the fetch on the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    fetchData()
  }, [selectedCategory]) // Trigger when the selected category changes

  console.log('Categories:', categories)
  return (
    <DashboardAffirmationView
      affirmation={affirmation}
      categories={categories} // Pass categories to the view
      selectedCategory={selectedCategory} // Pass selected category to the view
      setSelectedCategory={setSelectedCategory} // Pass setter for category selection
      loading={loading}
      error={error}
    />
  )
}

export const DashboardAffirmation = DashboardAffirmationPresenter
