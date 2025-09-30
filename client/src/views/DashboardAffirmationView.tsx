import { MenuCard } from '../components/MenuCard'

function DashboardAffirmationView() {
  return (
    <MenuCard
      title='Affirmation'
      isUsingCloseButton
      linkCloseButton='/dashboard'
    >
      <div>This is affirmation</div>
    </MenuCard>
  )
}

export default DashboardAffirmationView
