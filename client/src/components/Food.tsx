import styled from 'styled-components'
import fishIcon from '../assets/fish.png'
import fishIconEaten from '../assets/fish_eaten.png'
import { MenuLabel } from './MenuLabel'

const FishIcon = styled.img`
  width: 65px;
  height: 65px;
  filter: brightness(0) saturate(100%);
`

const FoodWrapper = styled.div`
  background: #a4b6b5;
  border: none;
  outline: none;
  position: fixed;
  right: 50px;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: opacity 0.2s;
  z-index: 10;
`

interface PropTypes {
  foodCount: number
}

function Food({ foodCount }: PropTypes) {
  const isEmpty = foodCount == 0
  return (
    <FoodWrapper>
      <FishIcon src={isEmpty ? fishIconEaten : fishIcon} alt="Fish" />
      <MenuLabel $active={!isEmpty}>{foodCount} Fish</MenuLabel>
    </FoodWrapper>
  )
}

export default Food
