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
import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface PropTypes {
  children?: ReactNode
  title?: string
  isUsingCloseButton?: boolean
  linkCloseButton?: string
}

export function MenuCard({
  children,
  title,
  isUsingCloseButton,
  linkCloseButton,
}: PropTypes) {
  return (
    <MyCard primary>
      <CardHeader>
        <CardTitle>{title ? title : 'Card Title'}</CardTitle>
        {isUsingCloseButton && (
          <Link to={linkCloseButton ?? '#'}>
            <CardIcon src={closeIcon} alt='Close' />
          </Link>
        )}
      </CardHeader>
      <InsideCardContainer>
        {children ? children : (
          <>
            <InsideCard primary/>
            <InsideCard>
                <InsideCardTitle>InsideCardTitle</InsideCardTitle>
                <InsideCardText>Text normal and small</InsideCardText>
            </InsideCard>
        </>
        )}
      </InsideCardContainer>
    </MyCard>
  );
}
