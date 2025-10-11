import { InsideCard, InsideCardText } from '../components/CardComponents'
import { MenuCard } from '../components/MenuCard'

function DashboardHistoryView() {
  return (
    <MenuCard title='History' isUsingCloseButton linkCloseButton='/dashboard'>
      <InsideCard primary>
        <InsideCardText>
          Here you can view your past activities and track your progress over time. Review your achievements and milestones to stay motivated on your journey!
        </InsideCardText>        
      </InsideCard>
      <InsideCard>
        <InsideCardText>
          Here you can view your past activities and track your progress over time. Review your achievements and milestones to stay motivated on your journey!
        </InsideCardText>
      </InsideCard>
    </MenuCard>
  )
}

export default DashboardHistoryView
