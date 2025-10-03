import { connect } from 'react-redux'
import DashboardPageView from '../views/DashboardPageView'
import { mapStateToDashboardProps } from '../maps/dashboardMap'

export const DashboardPage = connect(mapStateToDashboardProps)(
  DashboardPageView
)
