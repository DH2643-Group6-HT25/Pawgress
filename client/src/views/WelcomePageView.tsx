import { Link } from 'react-router'
import styled from 'styled-components'

import { MyButton } from '../components/MyButton'
import Header from '../components/Header'

function WelcomePage() {
  return (
    <Wrapper>
      <Header></Header>

      <Content>
        <Headline>Stay PRRductive by taking care of your pixel pet!</Headline>

        <SubHeadline>
          Turn your to-do list and journaling into a playful self-care journey.
        </SubHeadline>

        <ButtonRow>
          {/* Use Links so routing works */}
          <Primary as={Link} to='/signup'>
            Sign Up
          </Primary>
          <Secondary as={Link} to='/login'>
            Log In
          </Secondary>
        </ButtonRow>
      </Content>

      {/* Optional decorative icons — replace paths with your assets */}
      {/* <BgIcon className="cat" src="/icons/cat.png" alt="" /> */}

      <div>
        <MyButton primary as={Link} to='/dashboard'>
          Dashboard
        </MyButton>
        <MyButton primary as={Link} to='/loading'>
          Loading Page
        </MyButton>
      </div>
    </Wrapper>
  )
}

export default WelcomePage

/* ---------- styles ---------- */
const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #f4f1df 0%, #cddcd8 100%);
`

const Content = styled.div`
  text-align: center;
  max-width: 720px;
  padding: 0 24px;
`

const Headline = styled.h1`
  font-size: 48px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
`

const SubHeadline = styled.p`
  font-size: 20px;
  line-height: 1.5;
  opacity: 0.85;
  margin: 0 0 28px 0;
`

const ButtonRow = styled.div`
  display: inline-flex;
  gap: 12px;
`

const BaseBtn = styled.button`
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  border: 0;
  cursor: pointer;
  text-decoration: none;
`

const Primary = styled(BaseBtn)`
  background: #111;
  color: #fff;
`

const Secondary = styled(BaseBtn)`
  background: #444;
  color: #fff;
  opacity: 0.95;
`

// const BgIcon = styled.img` ... optional absolute positions ... `;
