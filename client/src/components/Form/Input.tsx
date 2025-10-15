import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1.5px solid ${(props) => props.theme.colors.dark_grey};
  font-size: 1rem;
  font-family: ${(props) => props.theme.fonts.pixel};
  background: #e6e6e6;
  margin-bottom: 8px;
  box-sizing: border-box;
`
