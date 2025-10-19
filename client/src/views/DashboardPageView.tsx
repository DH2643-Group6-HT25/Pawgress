import { Outlet } from 'react-router'
import styled from 'styled-components'
import DashboardWrapper from '../components/Wrappers/DashboardWrapper'
import { MyPet, PetContainer } from '../components/MyPet'
import Header from '../components/Header'
import DashboardMenu from '../components/DashboardMenu'
import PetStateHeader from '../components/PetStateHeader'
import ToDoListCard from '../components/ToDoListCard'
import type { DashboardActions, DashboardState } from '../maps/dashboardMap'
import Food from '../components/Food'
import { Poo } from '../components/Pet/Poo'
import {
  PetAfterFeedingBubble,
  PetFeedingBubble,
} from '../components/Pet/PetMessage'

const LeftDashboard = styled.div`
  flex: 0 0 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const MiddleDashboard = styled.div`
  flex: 1 1 55%;
  display: flex;
`
const RightDashboard = styled.div`
  flex: 0 0 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const DashboardBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60%;
`
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  display: flex;
  background-color: ${(props) => props.theme.colors.light_grey};
  z-index: 1;
`
const DashboardCatFooter = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  z-index: 2;
`

interface PropTypes extends DashboardState, DashboardActions {}

function DashboardPageView({
  petName,
  petHealth,
  petColor,
  todos,
  currentStreak,
  food,
  loading,
  afterFeedingMessage,
  isPetLoading,
  isCurrentlyFeeding,
  isPooDisplayed,
  isAfterFeedingMessageDisplayed,
  addTodo,
  deleteTodo,
  completeTodo,
  reorderLocal,
  reorderTodosBulk,
  feedPet,
}: PropTypes) {
  return (
    <DashboardWrapper>
      <Header />
      <div>
        {isPetLoading && <div>Loading Pet ...</div>}
        {!isPetLoading && (
          <PetStateHeader
            name={petName}
            health={petHealth}
            currentStreak={currentStreak}
          />
        )}
      </div>
      <DashboardBody>
        <LeftDashboard>
          <ToDoListCard
            todos={todos}
            loading={loading}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            reorderLocal={reorderLocal}
            reorderTodosBulk={reorderTodosBulk}
          />
        </LeftDashboard>
        <MiddleDashboard>
          <Outlet />
        </MiddleDashboard>
        <RightDashboard>
          <DashboardMenu />
        </RightDashboard>
      </DashboardBody>
      <DashboardCatFooter>
        <Poo isDisplayed={isPooDisplayed} />
        <PetAfterFeedingBubble
          isDisplayed={isAfterFeedingMessageDisplayed}
          message={afterFeedingMessage}
        />
        <PetContainer>
          {!isPetLoading && <MyPet health={petHealth} color={petColor} />}
        </PetContainer>
        <PetFeedingBubble isDisplayed={isCurrentlyFeeding} />
        <Food
          feedPet={feedPet}
          foodCount={food}
          isLoading={isPetLoading}
          isCurrentlyFeeding={isCurrentlyFeeding}
        />
      </DashboardCatFooter>
      <Footer />
    </DashboardWrapper>
  )
}

export default DashboardPageView
