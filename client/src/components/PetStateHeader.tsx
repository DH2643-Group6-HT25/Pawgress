import styled from "styled-components";

import streakIcon from '../assets/streak.png'
import heartIcon from '../assets/heart_5.png'


const HeaderWrapper = styled.header`
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
`;

const Name = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 0;
  padding: 0 12px;
  background: none;
  border: none;
  text-align: center;
`;

const StateIcon = styled.img`
  width: 28px;
  height: 28px;
  margin: 0 4px;
`;

const StateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.95rem;
  font-weight: bold;
  letter-spacing: 1px;
  background: none;
  border: none;
  padding: 0 12px;
  gap: 6px;
`;


const PetStateHeader = () => {
  return (
    <HeaderWrapper>
      <Name>Pelle</Name>
      <StateWrapper>
        <StateIcon src={heartIcon} alt="Heart" />
        <span>100%</span>
        <StateIcon src={streakIcon} alt="Streak" />
        <span>4 days</span>
      </StateWrapper>
    </HeaderWrapper>
  );
};

export default PetStateHeader;