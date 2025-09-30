import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../theme'
import type { ReactNode } from 'react'

interface PropTypes {
  children: ReactNode
}

const Container = styled.div`
  font-family: ${(props) => props.theme.fonts.pixel};
  margin: 0;
  width: 100%;
  display: block;
  overflow: hidden;
  padding: 0;
`

function LayoutWrapper({ children }: PropTypes) {
  return (
    <ThemeProvider theme={theme}>
      <Container>{children}</Container>
    </ThemeProvider>
  )
}

export default LayoutWrapper
