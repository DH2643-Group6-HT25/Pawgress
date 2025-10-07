import styled from 'styled-components'
import happyCat from '../assets/cat_happy_1.png'
import normalCat from '../assets/cat_normal_1.png'
import sleepyCat from '../assets/cat_sleepy_1.png'

export const PetContainer = styled.div`
  width: auto;
  height: 93px;
  overflow: hidden;
  position: relative;
  z-index: 1000;
`

const ImgPet = styled.img<{ $filter?: string }>`
  width: auto;
  height: 100px;
  cursor: pointer;
  object-fit: cover;
  filter: ${(props) => props.$filter || 'none'};

  &:active {
    transform: translate(-5px, -5px);
  }
`

export interface PetFilter {
  red: string
  pink: string
  green: string
}

const petFilter: PetFilter = {
  red: `invert(19%) sepia(37%) saturate(6758%) hue-rotate(352deg) brightness(87%) contrast(102%);`,
  pink: `invert(92%) sepia(39%) saturate(3963%) hue-rotate(276deg) brightness(89%) contrast(109%);`,
  green: `invert(93%) sepia(19%) saturate(5409%) hue-rotate(129deg) brightness(87%) contrast(96%);`,
}

interface PropTypes {
  src?: string
  health?: number
  color?: keyof PetFilter
  alt?: string
}
export function MyPet({ src, health, color }: PropTypes) {
  const imageSrc = src ?? happyCat
  const filter = color ? petFilter[color] : 'none'
  if (health) {
    if (health >= 75) {
      return <ImgPet $filter={filter} src={happyCat} />
    }
    if (health < 25) {
      return <ImgPet $filter={filter} src={sleepyCat} />
    }
    return <ImgPet $filter={filter} src={normalCat} />
  }

  return <ImgPet $filter={filter} src={imageSrc} />
}
