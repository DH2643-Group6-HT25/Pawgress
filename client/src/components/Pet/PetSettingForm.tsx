import { Field, Form } from 'formik'
import { MyButton } from '../MyButton'
import { MyPet, PetContainer } from '../MyPet'
import { Input } from '../Form/Input'

interface Values {
  colorChoice: string
  isLoading: boolean
}

interface PropTypes {
  values?: Values
}

export function PetSettingForm({ values }: PropTypes) {
  return (
    <>
      <PetContainer>
        <MyPet
          color={values?.colorChoice || 'black'}
          alt="pet-image"
          health={50}
        />
      </PetContainer>
      <Form>
        <label htmlFor="petName">How do you want to name your pet?</label>
        <br />
        <Field id="petName" name="petName" placeholder="" as={Input} />
        <br />
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
        <MyButton primary type="submit" disabled={values?.isLoading}>
          {values?.isLoading ? 'Loading...' : 'Save'}
        </MyButton>
      </Form>
    </>
  )
}
