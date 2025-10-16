import { connect } from 'react-redux'
import DashboardPageView from '../views/DashboardPageView'
import {
  mapStateToDashboardProps,
  mapDispatchToDashboardProps,
} from '../maps/dashboardMap'

const DashboardPagePresenter = (props: any) => <DashboardPageView {...props} />

export const DashboardPage = connect(
  mapStateToDashboardProps,
  mapDispatchToDashboardProps
)(DashboardPagePresenter)
