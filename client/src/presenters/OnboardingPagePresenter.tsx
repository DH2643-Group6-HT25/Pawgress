import { connect } from 'react-redux'
import OnboardingPageView from '../views/OnboardingPageView'
import {
  mapDispatchToOnboardingProps,
  mapStateToOnboardingProps,
  type InitialOnboardingDispatch,
  type InitialOnboardingState,
} from '../maps/onboardingMap'
import SuspenseView from '../views/SuspenseView'

interface PropTypes extends InitialOnboardingState, InitialOnboardingDispatch {}

function OnboardingPresenter({
  isInitialProtectedRender,
  isCredentialLoading,
  verifyUserACB,
  ...props
}: PropTypes) {
  if (isInitialProtectedRender && !isCredentialLoading) {
    verifyUserACB()
    return
  }

  if (isCredentialLoading) return <SuspenseView />

  return <OnboardingPageView {...props} />
}

export const OnboardingPage = connect(
  mapStateToOnboardingProps,
  mapDispatchToOnboardingProps
)(OnboardingPresenter)
