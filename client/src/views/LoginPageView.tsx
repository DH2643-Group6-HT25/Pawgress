import { useMemo } from "react";
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
  RegisterLink,
} from "../components/AuthUI";

export type LoginPageViewProps = {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  msg: string;
  handleSubmit: (e: React.FormEvent) => void;
};

const LoginPageView: React.FC<LoginPageViewProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  msg,
  handleSubmit,
}) => {
  const squares = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        top: `${Math.random() * 95}%`,
        left: `${Math.random() * 95}%`,
      })),
    []
  );

  return (
    <Background>
      <SquaresContainer>
        {squares.map((pos, i) => (
          <Square key={i} style={pos} />
        ))}
      </SquaresContainer>
      <Header />
      <Card>
        <Title>Login</Title>
        <StyledForm onSubmit={handleSubmit}>
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
            Login
          </MyButton>
        </StyledForm>
        <SmallText>
          Don't have an account?
          <RegisterLink to="/signup">Register</RegisterLink>
        </SmallText>
        {msg && <ErrorMsg>{msg}</ErrorMsg>}
      </Card>
    </Background>
  );
};

export default LoginPageView;
