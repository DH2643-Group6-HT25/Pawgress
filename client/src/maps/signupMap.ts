import type { RootState } from "../models";
import { userSignupThunk } from "../models/user/userThunks";
import { setEmail, setPassword, setName, setMsg } from "../models/user/userReducer";

export function mapStateToSignupProps(state: RootState) {
  return {
    email: state.user.email,
    password: state.user.password,
    name: state.user.name,
    msg: state.user.msg,
    loading: state.user.loading,
    loggedIn: state.user.loggedIn,
  };
}

export function mapDispatchToSignupProps(dispatch: any) {
  return {
    setEmail: (email: string) => dispatch(setEmail(email)),
    setPassword: (password: string) => dispatch(setPassword(password)),
    setName: (name: string) => dispatch(setName(name)),
    setMsg: (msg: string) => dispatch(setMsg(msg)),
    handleSubmit: (e: React.FormEvent, email: string, password: string, name: string) => {
      e.preventDefault();
      dispatch(userSignupThunk({ email, password, name }));
    },
  };
}