import type { FormEvent } from "react";
import { useMemo } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import { MyButton } from "../components/MyButton";
import {
  Background,
  SquaresContainer,
  Square,
  Card,
  Title,
  StyledForm,
  Label,
  Input,
  SmallText,
  ErrorMsg,
  LoginLink,
} from "../components/AuthUI";

export type SignupPageViewProps = {
  email: string;
  setEmail: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  msg: string;
  loggedIn: boolean;
  handleSubmit: (e: FormEvent, email: string, password: string, name: string) => void;
};

export const SignupPageView: React.FC<SignupPageViewProps> = ({
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  msg,
  loggedIn,
  handleSubmit,
}) => {
  // Generate positions only once (UI concern is fine here)
  const squares = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        top: `${Math.random() * 95}%`,
        left: `${Math.random() * 95}%`,
      })),
    []
  );

  if (loggedIn) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <Background>
      <SquaresContainer>
        {squares.map((pos, i) => (
          <Square key={i} style={pos} />
        ))}
      </SquaresContainer>
      <Header />
      <Card>
        <Title>Sign Up</Title>
        <StyledForm onSubmit={(e) => handleSubmit(e, email, password, name)}>
          <div>
            <Label htmlFor="name">User Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <MyButton
            primary
            type="submit"
            style={{
              width: "100%",
              marginTop: "10px",
              height: "40px",
              fontSize: "1.1rem",
            }}
          >
            Sign Up
          </MyButton>
        </StyledForm>
        <SmallText>
          Already have an account?
          <LoginLink to="/login">Login</LoginLink>
        </SmallText>
        {msg && <ErrorMsg>{msg}</ErrorMsg>}
      </Card>
    </Background>
  );
};
