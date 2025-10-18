import { connect } from 'react-redux'
import DashboardPageView from '../views/DashboardPageView'
import {
  mapStateToDashboardProps,
  mapDispatchToDashboardProps,
  type InitialDashboardState,
  type InitialDashboardActions,
} from '../maps/dashboardMap'
import { useEffect, useRef } from 'react'
import LoadingPageView from '../views/LoadingPageView'

interface PropTypes extends InitialDashboardState, InitialDashboardActions {}

function DashboardPagePresenter({
  isPageLoading,
  verifyUser,
  fetchPetInfo,
  ...props
}: PropTypes) {
  const initialPageRender = useRef(true)
  const initialPetRender = useRef(true)
  useEffect(() => {
    if (initialPageRender.current && !isPageLoading) {
      verifyUser()
      initialPageRender.current = false
    } else if (initialPetRender.current && !isPageLoading) {
      fetchPetInfo()
      initialPetRender.current = false
    }
  }, [isPageLoading, fetchPetInfo, verifyUser])

  if (isPageLoading) return <LoadingPageView />

  return <DashboardPageView {...props} />
}
export const DashboardPage = connect(
  mapStateToDashboardProps,
  mapDispatchToDashboardProps
)(DashboardPagePresenter)
