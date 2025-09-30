
import styled from 'styled-components';

interface CardProps {
  primary?: boolean;
}

export const CardIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const CardTitle = styled.h2`
    font-family: ${(props) => props.theme.fonts.pixel};
    text-transform: uppercase;
    margin-top: 5px;
    font-size: 1.5rem;
`;

export const InsideCardTitle = styled.h3`
    font-family: ${(props) => props.theme.fonts.pixel}, bold;
    text-transform: uppercase;
    margin-top: 5px;
    font-size: 1.0rem;
`;
export const InsideCardText = styled.p`
    font-family: ${(props) => props.theme.fonts.pixel};
    text-transform: undercase;
    margin-top: 5px;
    font-size: 0.8rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InsideCardContainer = styled.div`
  width: 100%;              
  height: 100%; 
  display: flex;
  flex-direction: row;
`;

export const InsideCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary',
})<CardProps>`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: ${(props) => props.theme.size.small_card_width};
  height: ${(props) => props.theme.size.small_card_height};

  border-radius: ${(props) => props.theme.size.card_border_radius};
  background-color: ${(props) => (props.primary ? props.theme.colors.light_grey : props.theme.colors.dark_grey)};
  color: ${(props) => props.theme.colors.black};
  padding: 10px 20px;
  text-transform: lowercase;
  margin: 5px;       

  @media (max-width: ${(props) => props.theme.size.card_width}) {
    width: 90%;  
    height: 90%; 
  }
  
`;

export const MyCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary',
})<CardProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.primary ? props.theme.size.card_width : props.theme.size.small_card_width)};
  max-width: 100%;           
  aspect-ratio: 720 / 470;   

  border: ${(props) => props.theme.border.thickness} solid ${(props) => props.theme.colors.black};
  border-radius: ${(props) => props.theme.size.card_border_radius};

  background-color: ${(props) => props.theme.colors.light_grey};
  color: ${(props) => props.theme.colors.black};
  padding: 10px 20px;
  text-transform: lowercase;
  margin: 5px;       

  @media (max-width: ${(props) => props.theme.size.card_width}) {
    width: 90%;  
    height: 90%; 
  }
  
`; 


