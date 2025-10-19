import styled from 'styled-components'
import fishIcon from '../assets/fish.png'
import fishIconEaten from '../assets/fish_eaten.png'
import clockIcon from '../assets/icons/clock.svg'
import { MenuLabel } from './MenuLabel'
import { NumberLabel } from './NumberLabel'

const FishIcon = styled.img<{ $notEmpty?: boolean }>`
  width: 65px;
  height: 65px;
  filter: brightness(0) saturate(100%);

  &:hover {
    cursor: ${({ $notEmpty }) => ($notEmpty ? 'pointer' : 'progress')};
  }
`
const ClockIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: brightness(0) saturate(100%);
  margin: 15px auto;

  &:hover {
    cursor: progress;
  }
`

const FoodWrapper = styled.div<{ $isDisplayed?: boolean }>`
  background: #a4b6b5;
  border: none;
  outline: none;
  position: fixed;
  right: 50px;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 10px;
  transition: opacity 0.2s;
  width: 85px;
  z-index: 10;
  display: flex;
  flex-direction: column;
`

interface PropTypes {
  foodCount: number
  isLoading?: boolean
  isCurrentlyFeeding: boolean
  feedPet: CallableFunction
}

function Food({
  foodCount,
  isLoading,
  feedPet,
  isCurrentlyFeeding,
}: PropTypes) {
  const isEmpty = foodCount == 0
  const foodImgSrc = {
    clock: clockIcon,
    fish: fishIcon,
    eaten: fishIconEaten,
  }
  return (
    <FoodWrapper>
      {isCurrentlyFeeding && <ClockIcon alt="Clock" src={foodImgSrc.clock} />}
      {!isCurrentlyFeeding && (
        <FishIcon
          $notEmpty={!isEmpty}
          src={isEmpty ? foodImgSrc.eaten : foodImgSrc.fish}
          alt="Fish"
          onClick={handleFoodClick}
        />
      )}
      {isLoading && <MenuLabel>Loading...</MenuLabel>}
      {isCurrentlyFeeding && <MenuLabel>Feeding...</MenuLabel>}
      {!isLoading && !isCurrentlyFeeding && (
        <MenuLabel $active={!isEmpty}>
          <NumberLabel>{foodCount}</NumberLabel>
          <span> Fish</span>
        </MenuLabel>
      )}
    </FoodWrapper>
  )

  function handleFoodClick() {
    if (!isLoading && !isCurrentlyFeeding) {
      feedPet()
    }
  }
}

export default Food
