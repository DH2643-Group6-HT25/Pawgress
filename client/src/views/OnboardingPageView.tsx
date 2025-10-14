import { MyButton } from '../components/MyButton'
import { MyPet } from '../components/MyPet'
import CenteredWrapper from '../components/Wrappers/CenteredWrapper'
import { Field, Form, Formik, type FormikHelpers } from 'formik'
import type { OnboardingDispatch, OnboardingState } from '../maps/onboardingMap'

interface PropTypes extends OnboardingState, OnboardingDispatch {}
interface Values {
  petName: string
  colorChoice: string
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
      <MyPet alt="pet-image" health={50} />
      <Formik
        initialValues={{
          petName: petName,
          colorChoice: petColor ?? '',
        }}
        onSubmit={handleNativeOnSubmit}
      >
        <Form>
          <label htmlFor="petName">How do you want to name your pet?</label>
          <br />
          <Field id="petName" name="petName" placeholder="" />
          <br />
          <br />
          <div>Choose color for your pet</div>
          <div role="group" aria-labelledby="colorChoice" id="colorChoice">
            <label>
              <Field type="radio" name="colorChoice" value="red" />
              Red
            </label>
            <label>
              <Field type="radio" name="colorChoice" value="pink" />
              Pink
            </label>
            <label>
              <Field type="radio" name="colorChoice" value="green" />
              Green
            </label>
          </div>
          <MyButton primary type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Save'}
          </MyButton>
        </Form>
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
