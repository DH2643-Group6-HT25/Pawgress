import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import fishIcon from '../assets/fish.png'
import fishIconPressed from '../assets/fish_eaten.png'
import journalIcon from '../assets/icons/pencil.svg'
import journalIconPressed from '../assets/icons/pencil-solid.png'
import historyIcon from '../assets/icons/history.svg'
import historyIconPressed from '../assets/icons/history-solid.svg'
import guideIcon from '../assets/icons/info.svg'
import guideIconPressed from '../assets/icons/info-solid.svg'
import affirmationIcon from '../assets/heart_3.png'
import affirmationIconPressed from '../assets/heart_5.png'

const MenuWrapper = styled.nav`
  width: 100px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
`

const MenuItem = styled.button<{ pressed?: boolean }>`
  background: none;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  cursor: pointer;
  transition: opacity 0.2s;
  z-index: 10;
`
const FishIcon = styled.img`
  width: 65px;
  height: 65px;
  filter: brightness(0) saturate(100%);
`

const Icon = styled.img`
  width: 32px;
  height: 32px;
  filter: brightness(0) saturate(100%);
`

const Label = styled.span<{ $pressed?: boolean }>`
  margin-top: 6px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: ${({ $pressed }) => ($pressed ? 'bold' : 'normal')};
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.pixel};
`

const DashboardMenu: React.FC = () => {
  const navigate = useNavigate()
  const path = window.location.hash

  const getPressed = (slug: string) => path.includes(slug)

  const handleMenuClick = (slug: string) => {
    if (getPressed(slug)) {
      navigate('/dashboard')
    } else {
      navigate(`/dashboard/${slug}`)
    }
  }

  return (
    <MenuWrapper>
      <MenuItem onClick={() => handleMenuClick('fish')}>
        <FishIcon
          src={getPressed('fish') ? fishIconPressed : fishIcon}
          alt="Fish"
        />
        <Label $pressed={getPressed('fish')}> 4 Fish</Label>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick('journal')}>
        <Icon
          src={getPressed('journal') ? journalIconPressed : journalIcon}
          alt="Journal"
        />
        <Label $pressed={getPressed('journal')}>Journal</Label>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick('history')}>
        <Icon
          src={getPressed('history') ? historyIconPressed : historyIcon}
          alt="History"
        />
        <Label $pressed={getPressed('history')}>History</Label>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick('guide')}>
        <Icon
          src={getPressed('guide') ? guideIconPressed : guideIcon}
          alt="Guide"
        />
        <Label $pressed={getPressed('guide')}>Guide</Label>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick('affirmation')}>
        <Icon
          src={
            getPressed('affirmation') ? affirmationIconPressed : affirmationIcon
          }
          alt="Affirmation"
        />
        <Label $pressed={getPressed('affirmation')}>Affirmation</Label>
      </MenuItem>
    </MenuWrapper>
  )
}

export default DashboardMenu
