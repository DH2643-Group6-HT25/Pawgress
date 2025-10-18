import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MenuCard } from '../components/MenuCard'
import {
  TabTitle,
  TabTitleContainer,
  TabContentContainer,
  TabsWrapper,
} from '../components/GuidanceTabs'
import GuidanceContent from '../components/Guidance/GuidanceContent'

export default function DashboardGuideView() {
  const [searchParams, setSearchParams] = useSearchParams()

  const tabFromURL = searchParams.get('tab')
  const activeTab = tabFromURL || '0'

  useEffect(() => {
    if (!tabFromURL) setSearchParams({ tab: '0' }, { replace: true })
  }, [tabFromURL, setSearchParams])

  const handleActiveTab = (id: number) => {
    setSearchParams({ tab: id.toString() })
  }

  const currentTab = GuidanceContent.find((g) => g.id.toString() === activeTab)

  return (
    <MenuCard title="Guide" isUsingCloseButton linkCloseButton="/dashboard">
      <TabsWrapper>
        <TabTitleContainer>
          {GuidanceContent.map((g) => (
            <TabTitle
              key={g.id}
              isActive={activeTab === g.id.toString()}
              onClick={() => handleActiveTab(g.id)}
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
