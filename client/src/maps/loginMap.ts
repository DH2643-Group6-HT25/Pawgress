import type { AppThunkDispatch, RootState } from '../models'
import { userLoginThunk } from '../models/user/userThunks'
import { setEmail, setPassword } from '../models/user/userReducer'

export interface StateToLoginProps {
  email: string
  password: string
  msg: string
  loggedIn: boolean
  sessionError: string | null
  loading: boolean
  hasPet: boolean
}

export function mapStateToLoginProps(state: RootState): StateToLoginProps {
  return {
    email: state.user.email,
    password: state.user.password,
    msg: state.user.msg,
    loading: state.user.loading,
    loggedIn: state.user.loggedIn,
    sessionError: state.user.sessionError,
    hasPet: state.user.hasPet,
  }
}

export interface DispatchToLoginProps {
  setEmail: CallableFunction
  setPassword: CallableFunction
  handleSubmit: CallableFunction
}

export function mapDispatchToLoginProps(dispatch: AppThunkDispatch) {
  return {
    setEmail: (v: string) => dispatch(setEmail(v)),
    setPassword: (v: string) => dispatch(setPassword(v)),
    handleSubmit: (e: React.FormEvent, email: string, password: string) => {
      e.preventDefault()
      dispatch(userLoginThunk({ email, pass: password }))
    },
  }
}
