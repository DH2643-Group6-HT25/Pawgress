import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  mapStateToHeaderProps,
  mapDispatchToHeaderProps,
} from '../maps/headerMap'

interface HeaderProps {
  primary?: boolean
  loggedIn?: boolean
  onLogout?: CallableFunction
}

const HeaderWrapper = styled.header`
  width: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  position: relative;
`

const Logo = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.75rem;
  font-weight: bold;
  letter-spacing: 2px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

const Logout = styled.div`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
`

const Header: React.FC<HeaderProps> = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    if (loggedIn) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  const handleLogout = () => {
    if (onLogout) onLogout()
    navigate('/')
  }

  return (
    <HeaderWrapper>
      <Logo onClick={handleLogoClick}>PAWGRESS</Logo>
      {loggedIn && <Logout onClick={handleLogout}>Log out</Logout>}
    </HeaderWrapper>
  )
}
const ConnectedHeader = connect(
  mapStateToHeaderProps,
  mapDispatchToHeaderProps
)(Header)

export default ConnectedHeader
