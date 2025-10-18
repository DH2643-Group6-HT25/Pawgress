import { useState } from 'react'

import { MenuCard } from '../components/MenuCard'
import {
  TabTitle,
  TabTitleContainer,
  TabContentContainer,
  TabsWrapper,
} from '../components/GuidanceTabs'
import GuidanceContent from '../components/Guidance/GuidanceContent'

export default function DashboardGuideView() {
  const [active, setActive] = useState<number>(0)

  const currentTab = GuidanceContent.find((g) => g.id === active)

  return (
    <MenuCard title="Guide" isUsingCloseButton linkCloseButton="/dashboard">
      <TabsWrapper>
        <TabTitleContainer>
          {GuidanceContent.map((g) => (
            <TabTitle
              key={g.id}
              isActive={active === g.id}
              onClick={() => setActive(g.id)}
            >
              {g.title}
            </TabTitle>
          ))}
        </TabTitleContainer>

        <TabContentContainer>{currentTab?.content}</TabContentContainer>
      </TabsWrapper>
    </MenuCard>
  )
}
