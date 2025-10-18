import styled from 'styled-components'

interface TabProps {
  isActive?: boolean
}

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
`

export const TabTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 90%;
  background-color: ${(props) => props.theme.colors.dark_grey};
  border-radius: 16px;
`

export const TabTitle = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})<TabProps>`
  cursor: pointer;
  width: 100%;
  font-size: 1em;
  height: 3em;
  display: flex;
  align-items: center;
  padding: 0 1em;
  transition: all 0.3s ease;

  font-family: ${(props) => props.theme.fonts.pixel};

  border-radius: 10px;

  background-color: ${(props) =>
    props.isActive
      ? props.theme.colors.highlight
      : props.theme.colors.dark_grey};

  border: ${(props) =>
    props.isActive ? props.theme.colors.highlight : props.theme.colors.black};

  &:hover {
    filter: brightness(1.1);
  }
`

export const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 90%;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.highlight};

  overflow-y: auto;
  margin-left: 10px;

  padding: 20px;
  box-sizing: border-box;
`

export const TabIMG = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  filter: brightness(0) saturate(100%);
`
