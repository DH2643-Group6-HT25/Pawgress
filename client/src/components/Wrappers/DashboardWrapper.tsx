import type { ReactNode } from 'react'
import styled from 'styled-components'

interface PropTypes {
  children: ReactNode
}

const DashboardContainer = styled.div`
  background-color: #ecead8;
  width: 100%;
  height: 100vh;
  display: block;
  place-items: center;
`

function DashboardWrapper({ children }: PropTypes) {
  return <DashboardContainer>{children}</DashboardContainer>
}

export default DashboardWrapper
