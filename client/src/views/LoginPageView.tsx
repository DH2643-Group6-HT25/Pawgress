import { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { MyButton } from '../components/MyButton'
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
} from '../components/AuthUI'
import type { DispatchToLoginProps, StateToLoginProps } from '../maps/loginMap'

export interface LoginPageViewProps
  extends StateToLoginProps,
    DispatchToLoginProps {}

const LoginPageView: React.FC<LoginPageViewProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  msg,
  userID,
  loading,
  handleSubmit,
}) => {
  const squares = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        top: `${Math.random() * 95}%`,
        left: `${Math.random() * 95}%`,
      })),
    []
  )

  const navigate = useNavigate()

  // Navigate on successful login
  useEffect(() => {
    if (userID) {
      navigate('/dashboard')
    }
  }, [userID, navigate])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(email, password).catch(() => {
      // error handled by msg prop
    })
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
        <Title>Login</Title>
        <StyledForm onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <MyButton
            primary
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '10px',
              height: '40px',
              fontSize: '1.1rem',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </MyButton>
        </StyledForm>
        <SmallText>
          Don't have an account?
          <RegisterLink to="/signup">Sign Up</RegisterLink>
        </SmallText>
        {msg && <ErrorMsg>{msg}</ErrorMsg>}
      </Card>
    </Background>
  )
}

export default LoginPageView
