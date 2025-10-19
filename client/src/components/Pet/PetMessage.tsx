import styled from 'styled-components'

const PetMessageBubble = styled.div<{ $isDisplayed?: boolean }>`
  position: static;
  top: 0;
  margin: 0 15px;
  border: ${(props) => props.theme.border.thickness} solid
    ${(props) => props.theme.colors.black};
  padding: 6px 5px;
  text-align: center;
  height: fit-content;
  min-width: 120px;
  border-radius: ${(props) => props.theme.size.card_border_radius};
  background-color: ${(props) => props.theme.colors.light_grey};
  opacity: ${(props) => (props.$isDisplayed ? '1' : '0')};
  transition: opacity 0.5s;
`

export const PetFeedingBubble = ({
  isDisplayed,
}: {
  isDisplayed?: boolean
}) => <PetMessageBubble $isDisplayed={isDisplayed}>Nom nom...</PetMessageBubble>

export const PetAfterFeedingBubble = ({
  isDisplayed,
  message,
}: {
  isDisplayed?: boolean
  message?: string
}) => <PetMessageBubble $isDisplayed={isDisplayed}>{message}</PetMessageBubble>
