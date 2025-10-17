import type { AppThunkDispatch, RootState } from '../models'
import { userLogoutThunk } from '../models/user/userThunks'

export function mapStateToHeaderProps(state: RootState) {
  return {
    loggedIn: state.user.loggedIn,
  }
}

export function mapDispatchToHeaderProps(dispatch: AppThunkDispatch) {
  return {
    onLogout: () => dispatch(userLogoutThunk()),
  }
}
