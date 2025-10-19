import styled from 'styled-components'
import fishIcon from '../assets/fish.png'
import fishIconEaten from '../assets/fish_eaten.png'
import { MenuLabel } from './MenuLabel'
import { NumberLabel } from './NumberLabel'

const FishIcon = styled.img<{ $notEmpty?: boolean }>`
  width: 65px;
  height: 65px;
  filter: brightness(0) saturate(100%);

  &:hover {
    cursor: ${({ $notEmpty }) => ($notEmpty ? 'pointer' : 'not-allowed')};
  }
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
  transition: opacity 0.2s;
  z-index: 10;
`

interface PropTypes {
  foodCount: number
  isLoading?: boolean
}

function Food({ foodCount, isLoading }: PropTypes) {
  const isEmpty = foodCount == 0
  return (
    <FoodWrapper>
      <FishIcon
        $notEmpty={!isEmpty}
        src={isEmpty ? fishIconEaten : fishIcon}
        alt="Fish"
      />
      {isLoading && <MenuLabel>Loading...</MenuLabel>}
      {!isLoading && (
        <MenuLabel $active={!isEmpty}>
          <NumberLabel>{foodCount}</NumberLabel>
          <span> Fish</span>
        </MenuLabel>
      )}
    </FoodWrapper>
  )
}

export default Food
