import styled, { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import type { ReactNode } from 'react'

interface PropTypes {
  children: ReactNode
}

const Container = styled.div`
  font-family: ${(props) => props.theme.fonts.pixel};
  margin: 0;
  place-items: center;
  height: 100%;
  overflow: hidden;
`

function LayoutWrapper({ children }: PropTypes) {
  return (
    <ThemeProvider theme={theme}>
      <Container>{children}</Container>
    </ThemeProvider>
  )
}

export default LayoutWrapper
