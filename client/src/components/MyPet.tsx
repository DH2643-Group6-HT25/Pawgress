

import styled from 'styled-components';

export const PetContainer = styled.div`
  width: auto;       /* beskärningsbredd */
  height: 93px;      /* beskärningshöjd */
  overflow: hidden;   /* döljer allt utanför boxen */
  position: relative;
`;

export const MyPet = styled.img`
  width: auto;
  height: 100px; 
  cursor: pointer;
  object-fit: cover;

  &:active {
    transform: translate(-5px, -5px);
  }
`;

