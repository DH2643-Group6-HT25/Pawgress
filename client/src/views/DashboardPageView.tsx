import { Link, Outlet } from 'react-router'
import DashboardWrapper from '../components/Wrappers/DashboardWrapper'
import styled from 'styled-components'
import cat from '../assets/cat_happy_1.png'
import { MyPet, PetContainer } from '../components/MyPet'
import Header from '../components/Header'

interface PropTypes {
  petName: string
}

function DashboardPageView({ petName }: PropTypes) {
  return (
    <DashboardWrapper>
      <Header primary/>
      <DashboardBody>
        <LeftDashboard>Section for todo list</LeftDashboard>
        <MiddleDashboard>
          <h3>{petName}</h3>
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
      <DashboardCatFooter>
        <PetContainer>
          <MyPet src={cat} alt='pet_image' />
        </PetContainer>
      </DashboardCatFooter>
      <Footer />
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
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15%;
  display: flex;
  background-color: ${(props) => props.theme.colors.light_grey};
  z-index: 1;
`
const DashboardCatFooter = styled.div`
  position: fixed;
  bottom: 15%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
`
