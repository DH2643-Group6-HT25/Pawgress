import { connect } from 'react-redux'
import OnboardingPageView from '../views/OnboardingPageView'
import {
  mapDispatchToOnboardingProps,
  mapStateToOnboardingProps,
} from '../maps/onboardingMap'

export const OnboardingPage = connect(
  mapStateToOnboardingProps,
  mapDispatchToOnboardingProps
)(OnboardingPageView)
