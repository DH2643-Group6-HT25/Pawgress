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
import closeIcon from '../assets/close.svg'

export function MenuCard() {
  return (
    <MyCard primary>
      <CardHeader>
        <CardTitle>Daily Journal</CardTitle>
        <CardIcon src={closeIcon} alt='Close' />
      </CardHeader>
      <InsideCardContainer>
        <InsideCard primary>
          <InsideCardTitle>InsideCardTitle</InsideCardTitle>
        </InsideCard>
        <InsideCard>
          <InsideCardText>Text normal and small</InsideCardText>
        </InsideCard>
      </InsideCardContainer>
    </MyCard>
  )
}
