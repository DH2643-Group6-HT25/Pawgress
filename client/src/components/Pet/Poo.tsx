import styled from 'styled-components'
import pooImg from '../../assets/poop.png'

const PooWrapper = styled.div<{ $isDisplayed?: boolean }>`
  position: fixed;
  bottom: 5px;
  margin-right: 200px;
  opacity: ${(props) => (props.$isDisplayed ? '1' : '0')};
  transition: opacity 0.5s;
`
const PooImg = styled.img`
  width: 40px;
`

export function Poo({ isDisplayed }: { isDisplayed?: boolean }) {
  return (
    <PooWrapper $isDisplayed={isDisplayed}>
      <PooImg src={pooImg} />
    </PooWrapper>
  )
}
