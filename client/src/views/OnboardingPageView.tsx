import CenteredWrapper from '../components/Wrappers/CenteredWrapper'
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  type FormikHelpers,
  type FormikProps,
} from 'formik'
import type { OnboardingDispatch, OnboardingState } from '../maps/onboardingMap'
import { MyPet, PetContainer } from '../components/MyPet'
import { MyButton } from '../components/MyButton'
import { Input } from '../components/AuthUI'
import { Navigate } from 'react-router'

interface PropTypes extends OnboardingState, OnboardingDispatch {}
interface Values {
  petName: string
  colorChoice: string
  isLoading: boolean
  petError: string | null
}

function OnboardingPageView({
  petName,
  petColor,
  isLoading,
  petError,
  submitPetInfoACB,
  hasPet,
}: PropTypes) {
  if (hasPet) <Navigate to="/dashboard" replace />
  return (
    <CenteredWrapper>
      <h1>Welcome To Pawgress!</h1>
      <h3>This is your pet</h3>
      <Formik
        initialValues={{
          petName: petName,
          colorChoice: petColor,
          isLoading: isLoading,
          petError: petError,
        }}
        onSubmit={handleNativeOnSubmit}
        validate={handleValidate}
      >
        {({ values }: FormikProps<Values>) => (
          <>
            <PetContainer>
              <MyPet
                color={values.colorChoice || 'black'}
                alt="pet-image"
                health={50}
              />
            </PetContainer>
            <Form>
              <label htmlFor="petName">How do you want to name your pet?</label>
              <br />
              <Field id="petName" name="petName" placeholder="" as={Input} />
              <br />
              <ErrorMessage name="petName" component="div" />
              <br />
              <div>Choose color for your pet</div>
              <div role="group" aria-labelledby="colorChoice" id="colorChoice">
                <label>
                  <Field type="radio" name="colorChoice" value="black" />
                  Black
                </label>
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
              {petError != null && <div>{petError}</div>}
            </Form>
          </>
        )}
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

  function handleValidate(values: Values) {
    const errors: { petName?: string } = {}
    if (!values.petName) {
      errors.petName = 'Pet Name Required'
    }
    return errors
  }
}

export default OnboardingPageView
