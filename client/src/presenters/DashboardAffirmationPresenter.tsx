import { connect } from "react-redux";
import DashboardAffirmationView from "../views/DashboardAffirmationView";
import {
  mapStateToAffirmationProps,
  mapDispatchToAffirmationProps,
} from "../maps/affirmationMap";

const DashboardAffirmationPresenter = connect(
  mapStateToAffirmationProps,
  mapDispatchToAffirmationProps
)(DashboardAffirmationView);

export const DashboardAffirmation = DashboardAffirmationPresenter;
