import { connect } from 'react-redux'
import {
  mapDispatchToOnboardingProps,
  mapStateToOnboardingProps,
  type InitialOnboardingDispatch,
  type InitialOnboardingState,
} from '../maps/onboardingMap'
import OnboardingPageView from '../views/OnboardingPageView'
import LoadingPageView from '../views/LoadingPageView'
import { useRef } from 'react'

interface PropTypes extends InitialOnboardingState, InitialOnboardingDispatch {}

function OnboardingPresenter({
  isCredentialLoading,
  verifyUserACB,
  isSessionError,
  ...props
}: PropTypes) {
  const initialRender = useRef(true)

  if (initialRender.current && !isCredentialLoading) {
    initialRender.current = false
    verifyUserACB()
    return
  }

  if (isCredentialLoading) return <LoadingPageView isError={isSessionError} />

  return <OnboardingPageView {...props} />
}

export const OnboardingPage = connect(
  mapStateToOnboardingProps,
  mapDispatchToOnboardingProps
)(OnboardingPresenter)
