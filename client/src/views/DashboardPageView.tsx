import { Link, Outlet } from 'react-router'
import DashboardWrapper from '../components/Wrappers/DashboardWrapper'
import styled from 'styled-components'

function DashboardPageView() {
  return (
    <DashboardWrapper>
      <DashboardHeader>
        <div>
          <Link to='/'>Pawgress</Link>
        </div>
        <div>
          <h2>Dashboard Header</h2>
        </div>
      </DashboardHeader>
      <DashboardBody>
        <LeftDashboard>Section for todo list</LeftDashboard>
        <MiddleDashboard>
          <Outlet />
        </MiddleDashboard>
        <RightDashboard>
          <Link to={'/dashboard/journal'} viewTransition>
            Journal
          </Link>
          <Link to={'/dashboard/history'} viewTransition>
            History
          </Link>
          <Link to={'/dashboard/affirmation'} viewTransition>
            Affirmation
          </Link>
          <Link to={'/dashboard/guide'} viewTransition>
            Guide
          </Link>
        </RightDashboard>
      </DashboardBody>
      <div>Pet</div>
    </DashboardWrapper>
  )
}

export default DashboardPageView

const LeftDashboard = styled.div`
  flex: 0 0 35%;
  display: flex;
`

const MiddleDashboard = styled.div`
  flex: 1 1 55%;
  display: flex;
`

const RightDashboard = styled.div`
  flex: 0 0 15%;
  display: flex;
  flex-direction: column;
`

const DashboardBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60%;
`

const DashboardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
