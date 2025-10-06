import { MenuCard } from "../components/MenuCard";
import styled from "styled-components";
import streakImg from "../assets/streak.png";
import {
  InsideCard,
  InsideCardText,
  InsideCardTitle,
  InsideCardContainer,
} from "../components/CardComponents";

function DashboardHistoryView() {
  return (
    <MenuCard title="History" isUsingCloseButton linkCloseButton="/dashboard">
      <InsideCardContainer>
        <LeftColumn>
          <InsideCard primary>
            <InsideCardContainerVertical>
              <InsideCardTitle>Best Streak</InsideCardTitle>
              <CardImage src={streakImg} alt="Streak" />
              <InsideCardText>Days</InsideCardText>
            </InsideCardContainerVertical>
          </InsideCard>
          <InsideCard primary>
            <InsideCardContainerVertical>
              <InsideCardTitle>Current Streak</InsideCardTitle>
              <CardImage src={streakImg} alt="Streak" />
              <InsideCardText>Days</InsideCardText>
            </InsideCardContainerVertical>
          </InsideCard>
        </LeftColumn>

        <RightColumn>
          <InsideCard>
            <InsideCardTitle>Weekly Progress</InsideCardTitle>
          </InsideCard>
        </RightColumn>
      </InsideCardContainer>
    </MenuCard>
  );
}

export default DashboardHistoryView;

const InsideCardContainerVertical = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RightColumn = styled.div`
  flex: 1;
`;

export const CardImage = styled.img`
  width: 48px;
  height: 48px;
`;
