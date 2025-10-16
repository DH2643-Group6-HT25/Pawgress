import { Outlet } from 'react-router'
import styled from 'styled-components'
import DashboardWrapper from '../components/Wrappers/DashboardWrapper'
import { MyPet, PetContainer } from '../components/MyPet'
import Header from '../components/Header'
import DashboardMenu from '../components/DashboardMenu'
import PetSateHeader from '../components/PetStateHeader'
import ToDoListCard from '../components/ToDoListCard'
import type { DashboardState } from '../maps/dashboardMap'

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

type Actions = {
  fetchTodos: () => any
  addTodo: (name: string) => any
  deleteTodo: (id: string) => any
  reorderLocal: (from: number, to: number) => any
  reorderTodosBulk: (items: { id: string; order: number }[]) => any
  updateStreakACB: () => any
  getStreakACB: () => any
}

interface PropTypes extends DashboardState, Actions {
  loading: boolean
}

function DashboardPageView({
  petName,
  petHealth,
  petColor,
  todos,
  loading,
  fetchTodos,
  addTodo,
  deleteTodo,
  reorderLocal,
  reorderTodosBulk,
}: PropTypes) {
  return (
    <DashboardWrapper>
      <Header primary />
      <PetSateHeader name={petName} health={petHealth} />
      <DashboardBody>
        <LeftDashboard>
          <ToDoListCard
            todos={todos}
            loading={loading}
            fetchTodos={fetchTodos}
            addTodo={addTodo}
            deleteTodo={deleteTodo}
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
        <PetContainer>
          <MyPet health={petHealth} color={petColor} />
        </PetContainer>
      </DashboardCatFooter>
      <Footer />
    </DashboardWrapper>
  )
}

export default DashboardPageView
