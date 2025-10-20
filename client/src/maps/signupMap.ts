import type { AppThunkDispatch, RootState } from '../models'
import { userSignupThunk } from '../models/user/userThunks'
import { setEmail, setPassword, setName } from '../models/user/userReducer'

export function mapStateToSignupProps(state: RootState) {
  return {
    email: state.user.email,
    password: state.user.password,
    name: state.user.name,
    msg: state.user.msg,
    loading: state.user.loading,
    loggedIn: state.user.loggedIn,
  }
}

export function mapDispatchToSignupProps(dispatch: AppThunkDispatch) {
  return {
    setEmail: (v: string) => dispatch(setEmail(v)),
    setPassword: (v: string) => dispatch(setPassword(v)),
    setName: (name: string) => dispatch(setName(name)),
    handleSubmit: (
      e: React.FormEvent,
      email: string,
      password: string,
      name: string
    ) => {
      e.preventDefault()
      dispatch(userSignupThunk({ email, password, name }))
    },
  }
}
