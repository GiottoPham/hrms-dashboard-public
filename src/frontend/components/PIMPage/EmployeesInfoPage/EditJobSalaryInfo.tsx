import type { JobDetailInputParams } from '@frontend/types/employee'
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
export const EditJobSalaryInfo = () => {
  const [edit, setEdit] = useState(true)
  const { openToast } = useToast()
  const bonusSchema = object().shape({
    bonusName: string(),
    bonusAmount: string(),
  })
  const newJobDetailValidationSchema = object().shape({
    joinDate: string().required('Join Date is required'),
    jobId: number().required('Select a job title'),
    pit: string().required('PIT is required'),
    unitId: number().required('Select one of the units'),
    salaryGroup: number().required('Select one of the salary group'),
    salary: string().required('Salary is required'),
    bonus: array().of(bonusSchema),
  })
  const jobDetail = {
    joinDate: '03/03/2022',
    jobId: 1,
    pit: 'hello',
    unitId: 1,
    salaryGroup: 1,
    salary: '1000',
    bonus: [{ bonusName: 'An sang', bonusAmount: '10000' }],
  }
  const DEFAULT_PERSONAL_DETAIL: PartialDeep<JobDetailInputParams> = {
    joinDate: jobDetail?.joinDate || new Date().toISOString(),
    jobId: jobDetail?.jobId,
    pit: jobDetail?.pit || '',
    unitId: jobDetail?.unitId,
    salaryGroup: jobDetail?.salaryGroup,
    salary: jobDetail?.salary || '',
    bonus: jobDetail?.bonus || [{ bonusName: '', bonusAmount: '' }],
  }
  return (
    <Formik
      initialValues={DEFAULT_PERSONAL_DETAIL}
      onSubmit={(values, { setSubmitting }) => {
        const bonusCompact = values.bonus?.filter(
          (item) =>
            !isEqual(item, {}) &&
            !isEqual(item, { bonusName: '', bonusAmount: '' })
        )
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve({ ...values, bonus: bonusCompact })
          }, 1000)
        })
        myPromise.then(() => {
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
            <div className="py-5 overflow-y-auto">
              <div className="flex space-x-10">
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
              <div className="flex space-x-10">
                <div className="w-1/3">
                  <UnitSelect disabled={edit} />
                </div>
                <div className="w-1/3">
                  <SalaryGroupSelect disabled={edit} />
                </div>
                <div className="w-1/3">
                  <JobDetailsInput
                    fieldName="salary"
                    label="Salary"
                    disabled={edit}
                  />
                </div>
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
