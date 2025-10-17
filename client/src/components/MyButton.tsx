import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface ButtonProps {
  primary?: boolean
}

export const MyButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary',
})<ButtonProps>`
  display: inline-flex;       
  align-items: center;         
  justify-content: center;   
  height: 30px;              
  padding: 8px 15px;            
  white-space: nowrap;        

  font-family: ${(props) => props.theme.fonts.pixel};
  font-size: 0.9rem;
  border: ${(props) => props.theme.border.thickness} solid ${(props) => props.theme.colors.black};
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.border.shadowOffset} ${(props) => props.theme.border.shadowOffset} 0 ${(props) => props.theme.colors.black}; 
  background-color: ${(props) => (props.primary ? props.theme.colors.dark_grey : props.theme.colors.light_grey)};
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
  text-transform: undercase;
  margin: 3px;       

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 ${(props) => props.theme.colors.black};
  };
  &:hover {
    filter: brightness(1.1);
  }
  &:disabled {
    box-shadow: 1px 1px 0 0 ${(props) => props.theme.colors.black}};
  }
`
export const RefreshButton = styled.button`
  background: ${(props) => props.theme.colors.light_grey};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(0.9);
  }
`
export const CloseLink = styled(Link)`
  background: ${(props) => props.theme.colors.light_grey};
  padding: 4px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border-radius: 8px;
`
