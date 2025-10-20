import { useEffect, useState, useRef } from 'react'
import DashboardAffirmationView from '../views/DashboardAffirmationView'
import {
  fetchAffirmation,
  fetchCategories,
  fetchAffirmationByCategory,
} from '../api/affirmation'
import { getErrorMessage } from '../utils/errorHandling'

function DashboardAffirmationPresenter() {
  const [affirmation, setAffirmation] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('random')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const isInitialRender = useRef(true)

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        console.error('Failed to fetch categories:', getErrorMessage(err))
      }
    }

    fetchCategoryData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let data
        if (selectedCategory === 'random') {
          data = await fetchAffirmation()
        } else {
          data = await fetchAffirmationByCategory(selectedCategory)
        }
        setAffirmation(data.text)
      } catch (err) {
        setError('Failed to fetch affirmation. Please try again.')
        console.error(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    fetchData()
  }, [selectedCategory])

  return (
    <DashboardAffirmationView
      affirmation={affirmation}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      loading={loading}
      error={error}
    />
  )
}

export const DashboardAffirmation = DashboardAffirmationPresenter
