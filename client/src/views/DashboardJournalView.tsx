import { InsideCard, InsideCardContainer, InsideCardText } from '../components/CardComponents'
import JournalFormik from '../components/JournalFormik'
import { MenuCard } from '../components/MenuCard'

function DashboardJournalView() {
  return (
    <MenuCard title='Journal' isUsingCloseButton linkCloseButton='/dashboard'>
      
      <JournalFormik/>
      <InsideCardContainer>
        <InsideCard/>
      </InsideCardContainer>
    </MenuCard>
  )
}

export default DashboardJournalView
