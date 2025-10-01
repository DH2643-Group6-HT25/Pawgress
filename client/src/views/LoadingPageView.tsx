import styled from 'styled-components'
import cat from '../assets/cat_happy_1.png';


function DashboardPageView() {
  return (
    <Wrapper>
      <Header>PAWGRESS</Header>
      <Content>
        <Headline>Loading ...</Headline>
        <MyPet src={cat} alt="pet_image"></MyPet>
        <AffirmationCard>Here you will have an affirmation</AffirmationCard>
      </Content>
    </Wrapper>
  )
}

export default DashboardPageView

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;     
  background: linear-gradient(180deg, #f4f1df 0%, #cddcd8 100%);
  padding: 16px;
`

const Header = styled.div`
  position: absolute;
  top: 24px;
  left: 32px;
  font-size: 18px;
`

const Headline = styled.h1`
  font-size: clamp(28px, 5vw, 48px); 
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
`
const MyPet = styled.img`
  max-width: 10%;
  height: auto;
  margin: 16px 0;
`
const AffirmationCard = styled.div`
  text-align: center;
  width: 100%;
  max-width: 400px; 
  padding: 16px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.light_grey};
`

const Content = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  gap: 16px; 
  width: 100%;

`
