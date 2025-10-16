import { useEffect } from 'react'
import styled from 'styled-components'
import type { StreakState, StreakDispatch } from '../maps/streakMap'
import streakImg from '../assets/streak.png'
import {
  InsideCard,
  InsideCardText,
  InsideCardTitle,
  InsideCardContainer,
} from '../components/CardComponents'
import { MenuCard } from '../components/MenuCard'
import DashboardStreakHistoryChart from './DashboardStreakHistoryChart'
import SuspenseView from './SuspenseView'

interface PropTypes extends StreakState, StreakDispatch {}

const DashboardHistoryView = ({
  currentStreak,
  bestStreak,
  streakHistory,
  isLoading,
  isStreakNewUser,
  getStreakACB,
}: PropTypes) => {
  useEffect(() => {
    getStreakACB()
  }, [getStreakACB])

  if (isLoading) {
    return <SuspenseView />
  }

  return (
    <MenuCard
      title="History"
      isUsingCloseButton
      isUsingRefreshButton
      linkCloseButton="/dashboard"
      linkRefreshButton={handleFetchStreak}
    >
      <InsideCardContainer>
        <LeftColumn>
          <LeftColumnWrapper>
            <InsideCard primary>
              <InsideCardContainerVertical>
                <InsideCardTitle>Best Streak</InsideCardTitle>
                <CardImage src={streakImg} alt="Streak" />
                <InsideCardText>{bestStreak}-Day Streak</InsideCardText>
              </InsideCardContainerVertical>
            </InsideCard>
            <InsideCard primary>
              <InsideCardContainerVertical>
                <InsideCardTitle>Current Streak</InsideCardTitle>
                <CardImage src={streakImg} alt="Streak" />
                <InsideCardText>{currentStreak}-Day Streak</InsideCardText>
              </InsideCardContainerVertical>
            </InsideCard>
          </LeftColumnWrapper>
        </LeftColumn>

        <RightColumn>
          <RightCardWrapper>
            <InsideCard large>
              <InsideCardTitle>Weekly Progress</InsideCardTitle>
              <ChartContainer>
                {isStreakNewUser ? (
                  <InsideCardText>Please start to finish todos!</InsideCardText>
                ) : (
                  <DashboardStreakHistoryChart streakHistory={streakHistory} />
                )}
              </ChartContainer>
            </InsideCard>
          </RightCardWrapper>
        </RightColumn>
      </InsideCardContainer>
    </MenuCard>
  )

  function handleFetchStreak() {
    getStreakACB()
  }
}

export default DashboardHistoryView

const InsideCardContainerVertical = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`

const LeftColumn = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const RightColumn = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100%;
  max-width: 100%;
`

const RightCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const CardImage = styled.img`
  width: 48px;
  height: 48px;
`

const ChartContainer = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  border-radius: 20px;
  svg text {
    font-family: ${(props) => props.theme.fonts.pixel};
  }
  text-transform: uppercase;
`
