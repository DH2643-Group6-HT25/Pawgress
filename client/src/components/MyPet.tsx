import styled from 'styled-components'

export const PetContainer = styled.div`
  width: auto; 
  height: 93px; 
  overflow: hidden;
  position: relative;
  z-index: 1000;
`

export const MyPet = styled.img`
  width: auto;
  height: 100px;
  cursor: pointer;
  object-fit: cover;

  &:active {
    transform: translate(-5px, -5px);
  }
`
