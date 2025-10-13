import styled from "styled-components";
import { Link } from "react-router";

export const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #f5f5e6;
  position: relative;
  overflow: hidden;
`;

export const SquaresContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

export const Square = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  background: #b9c7c7;
  opacity: 0.6;
  border-radius: 4px;
`;

export const Card = styled.div`
  background: ${(props) => props.theme.colors.light_grey};
  border: 3px solid ${(props) => props.theme.colors.black};
  border-radius: 28px;
  width: 400px;
  max-width: 90vw;
  margin: 60px auto 0 auto;
  padding: 36px 32px 32px 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.pixel};
  font-size: 2rem;
  margin-bottom: 18px;
  text-align: center;
`;

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Label = styled.label`
  font-family: ${(props) => props.theme.fonts.pixel};
  font-size: 1.1rem;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1.5px solid ${(props) => props.theme.colors.dark_grey};
  font-size: 1rem;
  font-family: ${(props) => props.theme.fonts.pixel};
  background: #e6e6e6;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

export const SmallText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 0;
`;

export const ErrorMsg = styled.p`
  color: #b33;
  font-size: 1rem;
  text-align: center;
  margin-top: 8px;
`;

export const LoginLink = styled(Link)`
  color: ${(props) => props.theme.colors.black};
  text-decoration: underline;
  margin-left: 4px;
  font-size: 0.95rem;
`;

export const RegisterLink = styled(Link)`
  color: ${(props) => props.theme.colors.black};
  text-decoration: underline;
  margin-left: 4px;
  font-size: 0.95rem;
`;
