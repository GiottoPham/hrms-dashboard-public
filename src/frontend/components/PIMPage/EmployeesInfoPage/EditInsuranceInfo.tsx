import { CitySelect } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/CitySelect'
import { DateInput } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/DateInput'
import { KCBSelect } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/KCBSelect'
import { NumberInput } from '@components/PIMPage/EmployeesInfoPage/InsuranceDetail/NumberInput'
import { useToast } from '@frontend/framework/Toast'
import { useEditEmployee } from '@frontend/state/employee-mutation'
import type { Employee, InsuranceInputParams } from '@frontend/types/employee'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import type { PartialDeep } from 'type-fest'
import { object, string, number } from 'yup'
export const EditInsuranceInfo = ({ employee }: { employee: Employee }) => {
  const { editEmployee } = useEditEmployee()
  const DEFAULT_INSURANCE_DETAIL: PartialDeep<InsuranceInputParams> = {
    cityId: employee.insuranceDetail?.cityId,
    kcbId: employee.insuranceDetail?.kcbId,
    health: {
      number: employee.insuranceDetail?.health?.number || '',
      issue_date:
        employee.insuranceDetail?.health?.issue_date ||
        new Date().toISOString(),
      to_date:
        employee.insuranceDetail?.health?.to_date || new Date().toISOString(),
      from_date:
        employee.insuranceDetail?.health?.from_date || new Date().toISOString(),
    },
    social: {
      number: employee.insuranceDetail?.social?.number || '',
      issue_date:
        employee.insuranceDetail?.social?.issue_date ||
        new Date().toISOString(),
      to_date:
        employee.insuranceDetail?.social?.to_date || new Date().toISOString(),
      from_date:
        employee.insuranceDetail?.social?.from_date || new Date().toISOString(),
    },
    unemployment: {
      number: employee.insuranceDetail?.unemployment?.number || '',
      issue_date:
        employee.insuranceDetail?.unemployment?.issue_date ||
        new Date().toISOString(),
      to_date:
        employee.insuranceDetail?.unemployment?.to_date ||
        new Date().toISOString(),
      from_date:
        employee.insuranceDetail?.unemployment?.from_date ||
        new Date().toISOString(),
    },
  }
  const insuranceSchema = object().shape({
    number: string(),
    issue_date: string(),
    to_date: string(),
    from_date: string(),
  })
  const newInsuranceDetailValidationSchema = object().shape({
    health: insuranceSchema,
    cityId: number(),
    kcbId: number(),
    social: insuranceSchema,
    unemployment: insuranceSchema,
  })
  const [edit, setEdit] = useState(true)
  const { openToast } = useToast()
  return (
    <Formik
      initialValues={DEFAULT_INSURANCE_DETAIL}
      onSubmit={(values, { setSubmitting }) => {
        editEmployee({
          id: employee.id,
          employeeParams: {
            insuranceDetail: values as InsuranceInputParams,
          },
        }).then(() => {
          setSubmitting(false)
          setEdit(true)
          openToast('Edit insurance info successful', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
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
                    insuranceDetail="issue_date"
                    label="Issue Date"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <DateInput
                    insurance="health"
                    insuranceDetail="from_date"
                    label="From Date"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="health"
                    insuranceDetail="to_date"
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
                    insuranceDetail="issue_date"
                    label="Issue Date"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <DateInput
                    insurance="social"
                    insuranceDetail="from_date"
                    label="From Date"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="social"
                    insuranceDetail="to_date"
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
                    insuranceDetail="issue_date"
                    label="Issue Date"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-10 mt-2">
                <div className="w-1/2">
                  <DateInput
                    insurance="unemployment"
                    insuranceDetail="from_date"
                    label="From Date"
                    disabled={edit}
                  />
                </div>
                <div className="w-1/2">
                  <DateInput
                    insurance="unemployment"
                    insuranceDetail="to_date"
                    label="To Date"
                    disabled={edit}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5 pb-5">
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
