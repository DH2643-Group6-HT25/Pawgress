import { connect } from 'react-redux'
import DashboardHistoryView from '../views/DashboardHistoryView'

import {
  mapStateToDashboardHistoryProps,
  mapDispatchToStreakProps,
} from '../maps/streakMap'

export const DashboardHistory = connect(
  mapStateToDashboardHistoryProps,
  mapDispatchToStreakProps
)(DashboardHistoryView)
