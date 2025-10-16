import styled from 'styled-components'

export const MenuLabel = styled.div<{ $active?: boolean }>`
  margin-top: 3px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.pixel};
`
