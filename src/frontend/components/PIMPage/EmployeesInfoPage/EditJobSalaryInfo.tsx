import type {
  Bonus,
  Employee,
  JobDetailInputParams,
} from '@frontend/types/employee'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import type { PartialDeep } from 'type-fest'
import { object, string, number, array } from 'yup'
import { JobDetailsInput } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/JobDetailsInput'
import { UnitSelect } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/UnitSelect'
import { SalaryGroupSelect } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/SalaryGroupSelect'
import { BonusInfo } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/BonusInfo'
import { isEqual } from 'lodash'
import { useState } from 'react'
import { JoinDatePicker } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/JoinDatePicker'
import { JobTitleSelect } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/JobTitleSelect'
import { useToast } from '@frontend/framework/Toast'
import { useEditEmployee } from '@frontend/state/employee-mutation'
import { NumberDetailInput } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/NumberDetailInput'
import { ShiftSelect } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/ShiftSelect'
export const EditJobSalaryInfo = ({ employee }: { employee: Employee }) => {
  const { editEmployee } = useEditEmployee()
  const [edit, setEdit] = useState(true)
  const { openToast } = useToast()
  const bonusSchema = object().shape({
    bonusName: string(),
    bonusAmount: string(),
  })
  const newJobDetailValidationSchema = object().shape({
    joinDate: string().required('Join Date is required'),
    jobId: number().required('Select a job title'),
    shiftId: number().required('Select a shift'),
    pit: string().required('PIT is required'),
    departmentId: number().required('Select one of the units'),
    salaryGroup: number().required('Select one of the salary group'),
    salary: string().required('Salary is required'),
    bonus: array().of(bonusSchema),
  })
  const DEFAULT_PERSONAL_DETAIL: PartialDeep<JobDetailInputParams> = {
    joinDate: employee.jobDetail?.joinDate || new Date().toISOString(),
    jobId: employee.jobDetail?.jobId,
    pit: employee.jobDetail?.pit || '',
    departmentId: employee.jobDetail?.departmentId,
    salaryGroup: employee.jobDetail?.salaryGroup,
    salary: employee.jobDetail?.salary,
    bonus: employee.jobDetail?.bonus || [{ bonusName: '', bonusAmount: 0 }],
    shiftId: employee.jobDetail.shiftId,
  }
  return (
    <Formik
      initialValues={DEFAULT_PERSONAL_DETAIL}
      onSubmit={(values, { setSubmitting }) => {
        const bonusCompact = values.bonus?.filter(
          (item) =>
            !isEqual(item, {}) &&
            !isEqual(item, { bonusName: '', bonusAmount: 0 })
        )
        editEmployee({
          id: employee.id,
          employeeParams: {
            jobDetail: {
              ...values,
              bonus: bonusCompact as Bonus[],
            } as JobDetailInputParams,
          },
        }).then(() => {
          setSubmitting(false)
          setEdit(true)
          openToast('Edit job info successful', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        })
      }}
      validationSchema={newJobDetailValidationSchema}
    >
      {({ isSubmitting, isValid, submitForm, setFieldTouched }) => {
        return (
          <div className="flex flex-col h-full">
            <div className="pt-3 overflow-y-auto h-1/2 space-y-2">
              <div className="flex space-x-5">
                <div className="w-1/3">
                  <JoinDatePicker label="Join Date" disabled={edit} />
                </div>
                <div className="w-1/3">
                  <JobTitleSelect disabled={edit} />
                </div>
                <div className="w-1/3">
                  <JobDetailsInput
                    fieldName="pit"
                    label="PIT"
                    disabled={edit}
                  />
                </div>
              </div>
              <div className="flex space-x-5">
                <div className="w-1/3">
                  <UnitSelect disabled={edit} />
                </div>
                <div className="w-1/3">
                  <SalaryGroupSelect disabled={edit} />
                </div>
                <div className="w-1/3">
                  <NumberDetailInput fieldName="salary" disabled={edit} />
                </div>
              </div>
              <div className="flex space-x-5">
                <div className="w-1/3">
                  <ShiftSelect disabled={edit} />
                </div>
                <div className="w-1/3"></div>
                <div className="w-1/3"></div>
              </div>
            </div>
            <div className="border-b border-gray-500 text-gray-500 text-xl">
              Bonus Info
            </div>
            <div className="border-b border-gray-500 flex-grow mt-2 py-5 overflow-y-auto">
              <BonusInfo disabled={edit} />
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
