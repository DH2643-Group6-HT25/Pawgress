import type { RootState } from "../models";
import { userLoginThunk } from "../models/user/userThunks";
import { setEmail, setPassword, setMsg } from "../models/user/userReducer";

export function mapStateToLoginProps(state: RootState) {
  return {
    email: state.user.email,
    password: state.user.password,
    msg: state.user.msg,
    loading: state.user.loading,
    loggedIn: state.user.loggedIn,
  };
}

export function mapDispatchToLoginProps(dispatch: any) {
  return {
    setEmail: (email: string) => dispatch(setEmail(email)),
    setPassword: (password: string) => dispatch(setPassword(password)),
    setMsg: (msg: string) => dispatch(setMsg(msg)),
    handleSubmit: (e: React.FormEvent, email: string, password: string) => {
      e.preventDefault();
      dispatch(userLoginThunk({ email, pass: password }));
    },
  };
}