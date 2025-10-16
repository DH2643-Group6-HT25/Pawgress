import { useEffect, useState, useRef } from 'react'
import DashboardAffirmationView from '../views/DashboardAffirmationView'
import { fetchAffirmation } from '../api/affirmation'

function DashboardAffirmationPresenter() {
  const [affirmation, setAffirmation] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Ref to track if the fetch has already been called
  const isInitialRender = useRef(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchAffirmation() // Call the API
        setAffirmation(data.text) // Assuming the API returns { text: "..." }
      } catch (err: any) {
        setError('Failed to fetch affirmation. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    // Only call fetchData if it's the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false // Set the flag to false after the first render
      fetchData() // Fetch affirmation on mount
    }
  }, [])

  return (
    <DashboardAffirmationView
      affirmation={affirmation}
      loading={loading}
      error={error}
    />
  )
}

export const DashboardAffirmation = DashboardAffirmationPresenter
