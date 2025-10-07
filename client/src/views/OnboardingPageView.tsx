import { Link } from 'react-router'
import { MyButton } from '../components/MyButton'
import { MyPet } from '../components/MyPet'
import CenteredWrapper from '../components/Wrappers/CenteredWrapper'
import { Field, Form, Formik } from 'formik'

function OnboardingPageView() {
  return (
    <CenteredWrapper>
      <h1>Welcome To Pawgress!</h1>
      <h3>This is your pet</h3>
      <MyPet alt='pet-image' health={50} />
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={handleNativeOnsubmit}
      >
        <Form>
          <label htmlFor='petName'>How do you want to name your pet?</label>
          <br />
          <Field id='petName' name='petName' placeholder='' />
          <br />
          <br />
          <div>Choose color for your pet</div>
          <div role='group' aria-labelledby='colorChoice' id='colorChoice'>
            <label>
              <Field type='radio' name='colorChoice' value='red' />
              Red
            </label>
            <label>
              <Field type='radio' name='colorChoice' value='pink' />
              Pink
            </label>
            <label>
              <Field type='radio' name='colorChoice' value='green' />
              Green
            </label>
          </div>
        </Form>
      </Formik>
      <MyButton primary as={Link} to='/dashboard'>
        Save
      </MyButton>
    </CenteredWrapper>
  )
}

export default OnboardingPageView

function handleNativeOnsubmit() {
  console.log('submit')
}
