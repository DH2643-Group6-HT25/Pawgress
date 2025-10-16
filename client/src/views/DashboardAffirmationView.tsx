import { MenuCard } from '../components/MenuCard'

interface DashboardAffirmationViewProps {
  affirmation: string | null
  loading: boolean
  error: string | null
}

function DashboardAffirmationView({
  affirmation,
  loading,
  error,
}: DashboardAffirmationViewProps) {
  return (
    <MenuCard
      title="Affirmation"
      isUsingCloseButton
      linkCloseButton="/dashboard"
    >
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <p>{affirmation}</p>}
    </MenuCard>
  )
}

export default DashboardAffirmationView
