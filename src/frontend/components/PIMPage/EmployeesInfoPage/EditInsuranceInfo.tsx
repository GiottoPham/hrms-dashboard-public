import { CitySelect } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/CitySelect'
import { DateInput } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/DateInput'
import { KCBSelect } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/KCBSelect'
import { NumberInput } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/NumberInput'
import type { InsuranceInputParams } from '@frontend/types/employee'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import type { PartialDeep } from 'type-fest'
import { object, string, number } from 'yup'
export const EditInsuranceInfo = () => {
  const insurance: PartialDeep<InsuranceInputParams | undefined> = {
    id: 1,
    health: {},
    social: {},
    unemployment: {},
  }
  const DEFAULT_INSURANCE_DETAIL: PartialDeep<InsuranceInputParams> = {
    health: {
      number: insurance?.health?.number || '',
      issueDate: insurance?.health?.issueDate || '',
      toDate: insurance?.health?.issueDate || '',
      fromDate: insurance?.health?.issueDate || '',
      cityId: insurance?.health?.cityId,
      kcbId: insurance?.health?.kcbId,
    },
    social: {
      number: insurance?.social?.number || '',
      issueDate: insurance?.social?.issueDate || '',
      toDate: insurance?.social?.issueDate || '',
      fromDate: insurance?.social?.issueDate || '',
    },
    unemployment: {
      number: insurance?.unemployment?.number || '',
      issueDate: insurance?.unemployment?.issueDate || '',
      toDate: insurance?.unemployment?.issueDate || '',
      fromDate: insurance?.unemployment?.issueDate || '',
    },
  }
  const insuranceSchema = object().shape({
    number: string(),
    issueDate: string(),
    toDate: string(),
    fromDate: string(),
  })
  const newInsuranceDetailValidationSchema = object().shape({
    health: object().shape({
      number: string(),
      issueDate: string(),
      toDate: string(),
      fromDate: string(),
      cityId: number(),
      kcbId: number(),
    }),
    social: insuranceSchema,
    unemployment: insuranceSchema,
  })
  const [edit, setEdit] = useState(true)
  return (
    <Formik
      initialValues={DEFAULT_INSURANCE_DETAIL}
      onSubmit={(values, { setSubmitting }) => {
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve('f')
            alert(values)
          }, 1000)
        })
        myPromise.then(() => {
          setSubmitting(false)
          setEdit(true)
        })
      }}
      validationSchema={newInsuranceDetailValidationSchema}
    >
      {({ isSubmitting, isValid, submitForm, setFieldTouched }) => {
        return (
          <div className="flex flex-col h-full">
            <div className="py-2">
              <div className="border-b border-gray-500 text-gray-500 text-xl">
                Health Insurance
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <NumberInput
                    label="Number"
                    insurance="health"
                    insuranceDetail="number"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="health"
                    insuranceDetail="issueDate"
                    label="Issue Date"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <DateInput
                    insurance="health"
                    insuranceDetail="fromDate"
                    label="From Date"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="health"
                    insuranceDetail="toDate"
                    label="To Date"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <CitySelect label="Province" disabled={edit} />
                </div>
                <div className="w-1/2">
                  <KCBSelect disabled={edit} />
                </div>
              </div>
              <div className="flex space-x-10">
                <div className="w-1/3"></div>
                <div className="w-1/3"></div>
                <div className="w-1/3"></div>
              </div>
            </div>
            <div className="py-2">
              <div className="border-b border-gray-500 text-gray-500 text-xl">
                Social Insurance
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <NumberInput
                    label="Number"
                    insurance="social"
                    insuranceDetail="number"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="social"
                    insuranceDetail="issueDate"
                    label="Issue Date"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <DateInput
                    insurance="social"
                    insuranceDetail="fromDate"
                    label="From Date"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="social"
                    insuranceDetail="toDate"
                    label="To Date"
                    disabled={edit}
                  />
                </div>
              </div>
            </div>
            <div className="py-2">
              <div className="border-b border-gray-500 text-gray-500 text-xl">
                Unemployment Insurance
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <NumberInput
                    label="Number"
                    insurance="unemployment"
                    insuranceDetail="number"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="unemployment"
                    insuranceDetail="issueDate"
                    label="Issue Date"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <DateInput
                    insurance="unemployment"
                    insuranceDetail="fromDate"
                    label="From Date"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="unemployment"
                    insuranceDetail="toDate"
                    label="To Date"
                    disabled={edit}
                  />
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
