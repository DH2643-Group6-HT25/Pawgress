import {
  MyCard,
  CardHeader,
  InsideCard,
  CardTitle,
  InsideCardText,
  InsideCardTitle,
  CardIcon,
  InsideCardContainer,
} from './CardComponents'
import closeIcon from '../assets/icons/close.svg'
import refreshIcon from '../assets/icons/refresh.svg'
import type { ReactNode } from 'react'
import { RefreshButton, CloseLink } from './MyButton'

interface PropTypes {
  children?: ReactNode
  title?: string
  isUsingCloseButton?: boolean
  isUsingRefreshButton?: boolean
  linkCloseButton?: string
  linkRefreshButton?: () => void
}

export function MenuCard({
  children,
  title,
  isUsingCloseButton,
  linkCloseButton,
  isUsingRefreshButton,
  linkRefreshButton,
}: PropTypes) {
  return (
    <MyCard primary>
      <CardHeader>
        <CardTitle>{title ? title : 'Card Title'}</CardTitle>
        {isUsingRefreshButton && (
          <RefreshButton onClick={linkRefreshButton}>
            <CardIcon src={refreshIcon} alt="Refresh" />
          </RefreshButton>
        )}
        {isUsingCloseButton && (
          <CloseLink to={linkCloseButton ?? '#'}>
            <CardIcon src={closeIcon} alt="Close" />
          </CloseLink>
        )}
      </CardHeader>
      <InsideCardContainer>
        {children ? (
          children
        ) : (
          <>
            <InsideCard primary />
            <InsideCard>
              <InsideCardTitle>InsideCardTitle</InsideCardTitle>
              <InsideCardText>Text normal and small</InsideCardText>
            </InsideCard>
          </>
        )}
      </InsideCardContainer>
    </MyCard>
  )
}
