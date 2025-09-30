import { MyCard, CardHeader, InsideCard, CardTitle, InsideCardText, InsideCardTitle, CardIcon, InsideCardContainer} from './CardComponents';

export function MenuCard() {
  return (
    <MyCard primary>
        <CardHeader>
            <CardTitle>Daily Journal</CardTitle>
            <CardIcon src="/assets/close.png" alt="Close" />
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
  );
}
