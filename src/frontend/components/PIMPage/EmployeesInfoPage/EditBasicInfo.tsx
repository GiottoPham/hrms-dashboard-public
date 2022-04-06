import { AddressInput } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep/AddressInput'
import { AvatarInput } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep/AvatarInput'
import { BirthdayPicker } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep/BirthdayPicker'
import { CitySelect } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep/CitySelect'
import { DistrictSelect } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep/DistrictSelect'
import { EmployeeDetailsInput } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep/EmployeeDetailsInput'
import { WardSelect } from '@components/PIMPage/AddEmployeePage/PersonalDetailsStep/WardSelect'
import { PhoneNumberInput } from '@frontend/framework/PhoneNumberInput'
import { useToast } from '@frontend/framework/Toast'
import { useEditEmployee } from '@frontend/state/employee-mutation'
import type {
  Employee,
  PersonalDetailInputParams,
} from '@frontend/types/employee'
import { Button, CircularProgress, InputLabel } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import type { PartialDeep } from 'type-fest'
import { mixed, number, object, string } from 'yup'

export const EditBasicInfo = ({ employee }: { employee: Employee }) => {
  const { openToast } = useToast()
  const { editEmployee } = useEditEmployee()
  const [edit, setEdit] = useState(true)
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
    avatar: mixed(),
    permanentAddress: addressSchema,
    temporaryAddress: addressSchema,
  })
  const DEFAULT_PERSONAL_DETAIL: PartialDeep<PersonalDetailInputParams> = {
    firstName: employee.personalDetail?.firstName || '',
    lastName: employee.personalDetail?.lastName || '',
    dateOfBirth:
      employee.personalDetail?.dateOfBirth || new Date().toISOString(),
    email: employee.personalDetail?.email || '',
    phone: employee.personalDetail?.phone || '',
    permanentAddress: {
      cityId: employee.personalDetail?.permanentAddress?.cityId,
      districtId: employee.personalDetail?.permanentAddress?.districtId,
      wardId: employee.personalDetail?.permanentAddress?.wardId,
      address: employee.personalDetail?.permanentAddress?.address || '',
    },
    temporaryAddress: {
      cityId: employee.personalDetail?.temporaryAddress?.cityId,
      districtId: employee.personalDetail?.temporaryAddress?.districtId,
      wardId: employee.personalDetail?.temporaryAddress?.wardId,
      address: employee.personalDetail?.temporaryAddress?.address || '',
    },
    sex: 'male',
  }

  return (
    <Formik
      validateOnMount
      initialValues={DEFAULT_PERSONAL_DETAIL}
      onSubmit={(values, { setSubmitting }) => {
        editEmployee({
          id: employee.id,
          employeeParams: {
            personalDetail: values as PersonalDetailInputParams,
          },
        }).then(() => {
          setSubmitting(false)
          setEdit(true)
          openToast('Edit basic info successful', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        })
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
          <div className="">
            <div className="border-b border-gray-500 flex-grow mt-2 py-5 px-2 overflow-y-auto">
              <div className="flex space-x-10">
                <div className="w-1/4 flex justify-center items-center">
                  <AvatarInput
                    disabled={edit}
                    avatarId={employee.personalDetail.avatar?.split('id=')[1]}
                  />
                </div>
                <div className="flex flex-grow flex-col space-y-5">
                  <div className="w-full flex">
                    <div className="w-1/3 mr-3">
                      <EmployeeDetailsInput
                        fieldName="firstName"
                        label="First Name"
                        disabled={edit}
                      />
                    </div>
                    <div className="w-1/3 mr-3">
                      <EmployeeDetailsInput
                        fieldName="lastName"
                        label="Last Name"
                        disabled={edit}
                      />
                    </div>
                    <div className="w-1/3">
                      <BirthdayPicker label="Date Of Birth" disabled={edit} />
                    </div>
                  </div>
                  <div className="w-full flex">
                    <div className="w-1/3 mr-3">
                      <EmployeeDetailsInput
                        fieldName="email"
                        label="Email"
                        disabled={edit}
                      />
                    </div>
                    <div className="w-1/3 mr-3">
                      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
                        Phone number
                      </InputLabel>
                      <PhoneNumberInput
                        disabled={edit}
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
                <div className="flex flex-col w-full">
                  <div className="flex space-x-3">
                    <div className="w-1/2">
                      <CitySelect label="City" disabled={edit} />
                    </div>
                    <div className="w-1/2">
                      <DistrictSelect
                        label="District"
                        cityId={values.permanentAddress?.cityId}
                        disabled={edit}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="w-1/2">
                      <WardSelect
                        label="Ward"
                        districtId={values.permanentAddress?.districtId}
                        disabled={edit}
                      />
                    </div>
                    <div className="w-1/2">
                      <AddressInput label="Address" disabled={edit} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-gray-300 p-3 mt-6">
                <div className="-mt-6 flex">
                  <p className="bg-white text-base font-semibold text-gray-500">
                    Temporary Address
                  </p>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex space-x-3">
                    <div className="w-1/2">
                      <CitySelect
                        label="City"
                        permanent={false}
                        disabled={edit}
                      />
                    </div>
                    <div className="w-1/2">
                      <DistrictSelect
                        label="District"
                        cityId={values.temporaryAddress?.cityId}
                        permanent={false}
                        disabled={edit}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="w-1/2">
                      <WardSelect
                        label="Ward"
                        permanent={false}
                        districtId={values.temporaryAddress?.districtId}
                        disabled={edit}
                      />
                    </div>
                    <div className="w-1/2">
                      <AddressInput
                        label="Address"
                        permanent={false}
                        disabled={edit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              {!edit ? (
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
                      <CircularProgress
                        color="primary"
                        size={20}
                        thickness={5}
                      />
                    )
                  }
                >
                  Save
                </Button>
              ) : (
                <Button
                  classes={{
                    root: 'rounded-full font-nunito normal-case shadow-none w-24 text-white',
                  }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setEdit(false)
                  }}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
