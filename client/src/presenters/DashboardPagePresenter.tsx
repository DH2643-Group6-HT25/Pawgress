import { connect } from 'react-redux'
import DashboardPageView from '../views/DashboardPageView'
import {
  mapStateToDashboardProps,
  mapDispatchToDashboardProps,
} from '../maps/dashboardMap'

export const DashboardPage = connect(
  mapStateToDashboardProps,
  mapDispatchToDashboardProps
)(DashboardPageView)
