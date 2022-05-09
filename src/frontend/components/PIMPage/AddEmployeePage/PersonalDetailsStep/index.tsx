import { useAddEmployeeForm } from '@frontend/state/add-employee-form'
import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { Button, CircularProgress, InputLabel } from '@mui/material'
import { Formik } from 'formik'
import { object, string, number, mixed } from 'yup'
import { CitySelect } from './CitySelect'
import type { PartialDeep } from 'type-fest'
import { DistrictSelect } from './DistrictSelect'
import { WardSelect } from './WardSelect'
import { AvatarInput } from './AvatarInput'
import { EmployeeDetailsInput } from './EmployeeDetailsInput'
import { BirthdayPicker } from './BirthdayPicker'
import { PhoneNumberInput } from '@frontend/framework/PhoneNumberInput'
import { AddressInput } from './AddressInput'

const addressSchema = object().shape({
  cityId: number().required(),
  districtId: number().required(),
  wardId: number().required(),
  address: string().required('Address is required'),
})
const newPersonalDetailValidationSchema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  dateOfBirth: string().required(),
  email: string().email().required('Email is required'),
  phone: string().required().required('Phone is required'),
  avatar: mixed().required(),
  permanentAddress: addressSchema,
  temporaryAddress: addressSchema,
})
export const PersonalDetailsStep = ({ goNext }: { goNext: () => void }) => {
  const {
    employeeParams: { personalDetail },
    setEmployeeParams,
  } = useAddEmployeeForm()
  const DEFAULT_PERSONAL_DETAIL: PartialDeep<PersonalDetailInputParams> = {
    firstName: personalDetail?.firstName || '',
    lastName: personalDetail?.lastName || '',
    dateOfBirth: personalDetail?.dateOfBirth || new Date().toISOString(),
    email: personalDetail?.email || '',
    phone: personalDetail?.phone || '',
    avatar: personalDetail?.avatar,
    permanentAddress: {
      cityId: personalDetail?.permanentAddress?.cityId,
      districtId: personalDetail?.permanentAddress?.districtId,
      wardId: personalDetail?.permanentAddress?.wardId,
      address: personalDetail?.permanentAddress?.address || '',
    },
    temporaryAddress: {
      cityId: personalDetail?.temporaryAddress?.cityId,
      districtId: personalDetail?.temporaryAddress?.districtId,
      wardId: personalDetail?.temporaryAddress?.wardId,
      address: personalDetail?.temporaryAddress?.address || '',
    },
  }
  return (
    <Formik
      initialValues={DEFAULT_PERSONAL_DETAIL}
      onSubmit={(values) => {
        setEmployeeParams((prev) => ({ ...prev!, personalDetail: values }))
        goNext()
      }}
      validationSchema={newPersonalDetailValidationSchema}
    >
      {({
        isSubmitting,
        isValid,
        values,
        setFieldValue,
        submitForm,
        setFieldTouched,
        errors,
        touched,
      }) => {
        return (
          <div className="flex flex-col font-nunito bg-white h-full px-8 py-4 border-2 border-primary w-9/12 transform rounded-xl md:overflow-y-auto">
            <div className="border-b border-gray-500 text-gray-500 text-xl">
              Personal Details
            </div>
            <div className="border-b border-gray-500 flex-grow mt-2 py-5 px-2 overflow-y-auto">
              <div className="flex space-x-10">
                <div className="w-1/4 flex justify-center items-center">
                  <AvatarInput />
                </div>
                <div className="flex flex-grow flex-col space-y-5">
                  <div className="w-full flex">
                    <div className="w-1/3 mr-3">
                      <EmployeeDetailsInput
                        fieldName="firstName"
                        label="First Name"
                      />
                    </div>
                    <div className="w-1/3 mr-3">
                      <EmployeeDetailsInput
                        fieldName="lastName"
                        label="Last Name"
                      />
                    </div>
                    <div className="w-1/3">
                      <BirthdayPicker label="Date Of Birth" />
                    </div>
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/3 mr-3">
                      <EmployeeDetailsInput fieldName="email" label="Email" />
                    </div>
                    <div className="w-1/3 mr-3">
                      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
                        Phone number
                      </InputLabel>
                      <PhoneNumberInput
                        name="phone"
                        id="phone-number-input"
                        placeholder="Phone number"
                        defaultCountry="VN"
                        value={values.phone}
                        isError={!!errors.phone && touched.phone}
                        onChange={(phone) =>
                          setFieldValue('phone', phone || '')
                        }
                      />
                      {!!errors.phone && touched.phone && (
                        <p className="text-danger text-sm font-semibold">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="w-1/3"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-gray-300 p-3 mt-6">
                <div className="-mt-6 flex">
                  <p className="bg-white text-base font-semibold text-gray-500">
                    Permanent Address
                  </p>
                </div>
                <div className="flex flex-row space-x-10 w-full">
                  <div className="w-1/4">
                    <CitySelect label="City" />
                  </div>
                  <div className="w-1/4">
                    <DistrictSelect
                      label="District"
                      cityId={values.permanentAddress?.cityId}
                    />
                  </div>
                  <div className="w-1/4">
                    <WardSelect
                      label="Ward"
                      districtId={values.permanentAddress?.districtId}
                    />
                  </div>
                  <div className="w-1/4">
                    <AddressInput label="Address" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-gray-300 p-3 mt-6">
                <div className="-mt-6 flex">
                  <p className="bg-white text-base font-semibold text-gray-500">
                    Temporary Address
                  </p>
                </div>
                <div className="flex flex-row space-x-10 w-full">
                  <div className="w-1/4">
                    <CitySelect label="City" permanent={false} />
                  </div>
                  <div className="w-1/4">
                    <DistrictSelect
                      label="District"
                      cityId={values.temporaryAddress?.cityId}
                      permanent={false}
                    />
                  </div>
                  <div className="w-1/4">
                    <WardSelect
                      label="Ward"
                      permanent={false}
                      districtId={values.temporaryAddress?.districtId}
                    />
                  </div>
                  <div className="w-1/4">
                    <AddressInput label="Address" permanent={false} />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-end mt-5">
              <Button
                classes={{
                  root: 'rounded-full font-nunito normal-case shadow-none w-24 text-white',
                }}
                color="primary"
                variant="contained"
                onClick={() => {
                  setFieldTouched('permanentAddress.cityId')
                  submitForm()
                }}
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
        )
      }}
    </Formik>
  )
}
