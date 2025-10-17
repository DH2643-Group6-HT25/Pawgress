
import styled from 'styled-components';
import { MyButton } from '../MyButton';
import { InsideCardText } from '../CardComponents';

export const Editor = styled.div`
	display: flex;
	width: 90%;
  height: 30%; 
	border: 2px solid ${(props) => props.theme.colors.black};
	border-radius: 6px;
	padding: 8px;
	margin-bottom: 8px;
	font-family: inherit;
	font-size: 0.9rem;
	overflow-x: hidden;
	overflow-y: auto;
	resize: none;
	background: #fff;
`;

// Jounral Editor Components
export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  height: 100%;
  padding: 0px 10px;
  text-transform: lowercase;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 8px 6px;
    font-size: 0.8rem;
  }
`;

export const Toolbar = styled.div`
	display: flex;
  margin-bottom: 5px;
`;

// JournalHistoryList Components
export const JournalListContainer = styled.div`
  width: 100%;
  max-height: 95%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 15px;
`;

  // Placeholder image (transparent checkerboard)
export const PLACEHOLDER =
    'data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="%23eee"/><rect width="60" height="60" fill="%23ccc"/><rect x="60" y="60" width="60" height="60" fill="%23ccc"/></svg>';

export const PreviewImage = styled.img`
    width: 20%;
    height: 20%;
    border-radius: 5px;
    border: 1px solid #ccc;
    object-fit: cover;
    background: #f6f6f6;
  `;

export const ImageRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 16px;
    margin: 10px 0 0 0;
  `;

export const ImageMyButton = styled(MyButton)`
    min-width: unset;
    height: 15px;
    border-width: 2px;
    text-transform: undercase;
    box-shadow: 2px 2px 0 #000
  `;

export const FormatMyButton = styled(MyButton)`
    min-width: unset;
    padding: 10px 10px;
    border-width: 2px;
    box-shadow: 2px 2px 0 #000;
  `;

export const JournalEntryCard = styled.div`
  background: ${(props) => props.theme.colors.dark_grey};
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
`;

// Styled for the image in the card
export const JournalImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ccc;
  background: repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 20px 20px;
  margin-left: 0.5rem;
`;

export const CardBottomRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin-top: 10px;
`;

export const CardImageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const TrashWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const CardDate = styled.div`
  font-weight: bold;
  font-size: 1.0rem;
  margin-bottom: 8px;
  margin-top: 0px;
`;

export const CardText = styled(InsideCardText)`
  margin-bottom: 10px !important;
`;