import type { RootState } from "../models";
import { logout } from "../models/user/userReducer";

export function mapStateToHeaderProps(state: RootState) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

export function mapDispatchToHeaderProps(dispatch: any) {
  return {
    onLogout: () => dispatch(logout()),
  };
}