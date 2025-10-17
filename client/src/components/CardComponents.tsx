// Container for all previous journals (scrollable)
export const JournalListContainer = styled.div`
  width: 100%;
  max-height: 350px;
  background: ${(props) => props.theme.colors.dark_grey};
  border-radius: ${(props) => props.theme.size.card_border_radius};
  border: 2px solid ${(props) => props.theme.colors.black};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`

// Single journal card
export const JournalEntryCard = styled.div`
  background: ${(props) => props.theme.colors.dark_grey};
  border-radius: ${(props) => props.theme.size.card_border_radius};
  border: 2px solid ${(props) => props.theme.colors.black};
  padding: 18px 18px 12px 18px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  padding: 8px;
`

export const JournalEntryHeader = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
`

export const JournalEntryText = styled.div`
  font-size: 1rem;
  margin-bottom: 8px;
  word-break: break-word;
`

export const JournalEntryImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ccc;
  position: absolute;
  top: 18px;
  right: 18px;
  background: repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 20px 20px;
`

import styled from 'styled-components'

interface CardProps {
  primary?: boolean
  large?: boolean
}

export const CardIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const CardTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.pixel};
  text-transform: uppercase;
  margin-top: 5px;
  font-size: 1.2rem;
  margin: 0;
  lineheight: 1;
`

export const InsideCardTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.pixel}, bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  word-break: break-word;
`
export const InsideCardText = styled.p`
  font-family: ${(props) => props.theme.fonts.pixel};
  text-transform: lowercase;
  align-items: center;
  margin-top: 5px;
  font-size: 0.9rem;
  word-break: break-word;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  gap: 8px;
`

export const InsideCardContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
`

export const InsideCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary' && prop !== 'large',
})<CardProps>`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;

  width: ${(props) =>
    props.large
      ? props.theme.size.large_card_width
      : props.theme.size.small_card_width};

  height: ${(props) =>
    props.large
      ? props.theme.size.large_card_heigth
      : props.theme.size.small_card_height};

  padding: 10px 10px;
  border-radius: ${(props) => props.theme.size.card_border_radius};
  background-color: ${(props) =>
    props.primary
      ? props.theme.colors.light_grey
      : props.theme.colors.dark_grey};
  color: ${(props) => props.theme.colors.black};
  text-transform: undercase;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 8px 6px;
    font-size: 0.8rem;
  }
`

export const MyCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'primary',
})<CardProps>`
  position: fixed;
  flex-direction: row;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  width: min(90vw, 38%);
  min-width: 100px;
  max-width: 80vw;
  max-height: 50vh;
  aspect-ratio: 720 / 470;
  border: ${(props) => props.theme.border.thickness} solid
    ${(props) => props.theme.colors.black};
  border-radius: ${(props) => props.theme.size.card_border_radius};
  background-color: ${(props) => props.theme.colors.light_grey};
  color: ${(props) => props.theme.colors.black};
  padding: 10px 15px;
  text-transform: lowercase;
  margin: 5px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: 96vw;
    right: 2vw;
    padding: 6px 4vw;
  }
  @media (max-width: 600px) {
    min-width: 0;
    width: 99vw;
    right: 0;
    padding: 4px 2vw;
    aspect-ratio: unset;
  }
`
