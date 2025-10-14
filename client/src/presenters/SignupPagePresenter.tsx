import { connect } from "react-redux";
import { SignupPageView } from "../views/SignupPageView";
import {
  mapStateToSignupProps,
  mapDispatchToSignupProps,
} from "../maps/signupMap";

const ConnectedSignupPagePresenter = connect(
  mapStateToSignupProps,
  mapDispatchToSignupProps
)(SignupPageView);

export const SignupPage = ConnectedSignupPagePresenter;