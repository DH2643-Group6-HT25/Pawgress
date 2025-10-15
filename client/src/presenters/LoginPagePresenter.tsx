import { connect } from "react-redux";
import LoginPageView from "../views/LoginPageView";
import {
  mapStateToLoginProps,
  mapDispatchToLoginProps,
} from "../maps/loginMap";

const ConnectedLoginPagePresenter = connect(
  mapStateToLoginProps,
  mapDispatchToLoginProps
)(LoginPageView);

export const LoginPage = ConnectedLoginPagePresenter;
