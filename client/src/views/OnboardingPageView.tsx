import CenteredWrapper from '../components/Wrappers/CenteredWrapper'
import { Formik, type FormikHelpers } from 'formik'
import type { OnboardingDispatch, OnboardingState } from '../maps/onboardingMap'
import { PetSettingForm } from '../components/Pet/PetSettingForm'

interface PropTypes extends OnboardingState, OnboardingDispatch {}
interface Values {
  petName: string
  colorChoice: string
  isLoading: boolean
}

function OnboardingPageView({
  petName,
  petColor,
  isLoading,
  submitPetInfoACB,
}: PropTypes) {
  return (
    <CenteredWrapper>
      <h1>Welcome To Pawgress!</h1>
      <h3>This is your pet</h3>
      <Formik
        initialValues={{
          petName: petName,
          colorChoice: petColor,
          isLoading: isLoading,
        }}
        onSubmit={handleNativeOnSubmit}
      >
        {PetSettingForm}
      </Formik>
    </CenteredWrapper>
  )
  async function handleNativeOnSubmit(
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) {
    await submitPetInfoACB(values.petName, values.colorChoice)
    if (!isLoading) setSubmitting(false)
  }
}

export default OnboardingPageView
