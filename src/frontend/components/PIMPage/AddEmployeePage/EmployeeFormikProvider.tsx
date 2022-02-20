import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { AddressInput } from './CitySelect'
const DEFAULT_PERSONAL_DETAIL: Partial<PersonalDetailInputParams> = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  avatar: '',
  permanentAddress: {
    city: '',
    district: '',
    ward: '',
    address: '',
  },
  temporaryAddress: {
    city: '',
    district: '',
    ward: '',
    address: '',
  },
}
const addressSchema = object().shape({
  city: string().required(),
  district: string().required(),
  ward: string().required(),
  address: string().required(),
})
const newPersonalDetailValidationSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  dateOfBirth: string().required(),
  email: string().required(),
  phone: string().required(),
  avatar: string().required(),
  permanentAddress: addressSchema,
  temporaryAddress: addressSchema,
})
export const EmployeeFormikProvider = ({
  goNext,
  goBack,
}: {
  goNext: () => void
  goBack: () => void
}) => {
  return (
    <Formik
      initialValues={DEFAULT_PERSONAL_DETAIL}
      onSubmit={(
        {
          avatar,
          firstName,
          lastName,
          dateOfBirth,
          email,
          phone,
          permanentAddress,
        },
        { setSubmitting }
      ) => {
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve('f')
            alert(
              'hello' +
                avatar +
                firstName +
                lastName +
                dateOfBirth +
                email +
                phone +
                permanentAddress?.['city']
            )
          }, 2000)
        })
        myPromise.then(() => {
          setSubmitting(false)
        })
      }}
      // validationSchema={newPersonalDetailValidationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-4/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
          <div className="border-b border-gray-500 text-gray-500 text-xl">
            Add User
          </div>
          <div className="border-b border-gray-500 flex-grow mt-2">
            <div className="flex flex-row justify-between space-x-10">
              <div className="w-1/2">
                <AddressInput fieldName="city" label="city" />
              </div>
              <div className="w-1/2">
                {/* <UserInput fieldName="username" label="Username" /> */}
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-10 mt-5">
              <div className="w-1/2">
                {/* <UserInput fieldName="role" label="Role" /> */}
              </div>
              <div className="w-1/2">{/* <StatusInput /> */}</div>
            </div>
            <div className="bg-gray-200 px-5 pt-5 pb-7 w-2/3 mt-5 rounded-lg">
              {/* <UserPasswordInput /> */}
            </div>
          </div>
          <div className="self-end mt-5">
            <Button
              classes={{
                root: 'rounded-full font-nunito normal-case shadow-none w-24 text-primary mr-5',
              }}
              color="primary"
              variant="outlined"
              onClick={goBack}
            >
              Back
            </Button>
            <Button
              classes={{
                root: 'rounded-full font-nunito normal-case shadow-none w-24 text-white',
              }}
              color="primary"
              variant="contained"
              onClick={goNext}
              type="submit"
              disabled={!isValid || isSubmitting}
              startIcon={
                isSubmitting && (
                  <CircularProgress color="primary" size={20} thickness={5} />
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Formik>
  )
}
