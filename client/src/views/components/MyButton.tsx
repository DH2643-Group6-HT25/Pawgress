
import styled from 'styled-components';

interface ButtonProps {
  primary?: boolean;
}

export const MyButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary',
})<ButtonProps>`
  
  font-family: ${(props) => props.theme.fonts.pixel};
  border: ${(props) => props.theme.border.thickness} solid ${(props) => props.theme.colors.black};
  box-shadow: ${(props) => props.theme.border.shadowOffset} ${(props) => props.theme.border.shadowOffset} 0 ${(props) => props.theme.colors.black}; 
  background-color: ${(props) => (props.primary ? props.theme.colors.dark_grey : props.theme.colors.light_grey)};
  color: ${(props) => props.theme.colors.black};
  padding: 10px 20px;
  cursor: pointer;
  text-transform: uppercase;
  margin: 5px;       

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 ${(props) => props.theme.colors.black};
  };
  &:hover {
    filter: brightness(1.1);
  }
  
`;


