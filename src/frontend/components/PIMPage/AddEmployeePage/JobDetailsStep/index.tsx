import { JobTitleSelect } from './JobTitleSelect'
import { JoinDatePicker } from './JoinDatePicker'
import { useAddEmployeeForm } from '@frontend/state/add-employee-form'
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
import { NumberDetailInput } from '@components/PIMPage/AddEmployeePage/JobDetailsStep/NumberDetailInput'

const bonusSchema = object().shape({
  bonusName: string(),
  bonusAmount: string(),
})
const newJobDetailValidationSchema = object().shape({
  joinDate: string().required('Join Date is required'),
  jobId: number().required('Select a job title'),
  pit: string().required('PIT is required'),
  departmentId: number().required('Select one of the units'),
  salaryGroup: number().required('Select one of the salary group'),
  salary: string().required('Salary is required'),
  bonus: array().of(bonusSchema),
})
export const JobDetailsStep = ({
  goNext,
  goBack,
}: {
  goNext: () => void
  goBack: () => void
}) => {
  const {
    employeeParams: { jobDetail },
    setEmployeeParams,
  } = useAddEmployeeForm()
  const DEFAULT_PERSONAL_DETAIL: PartialDeep<JobDetailInputParams> = {
    joinDate: jobDetail?.joinDate || new Date().toISOString(),
    jobId: jobDetail?.jobId,
    pit: jobDetail?.pit || '',
    departmentId: jobDetail?.departmentId,
    salaryGroup: jobDetail?.salaryGroup,
    salary: jobDetail?.salary,
    bonus: jobDetail?.bonus || [{ bonusName: '', bonusAmount: 0 }],
  }
  return (
    <Formik
      initialValues={DEFAULT_PERSONAL_DETAIL}
      onSubmit={(values) => {
        const bonusCompact = values.bonus?.filter(
          (item) =>
            !isEqual(item, {}) &&
            !isEqual(item, { bonusName: '', bonusAmount: '' })
        )
        setEmployeeParams((prev) => ({
          ...prev!,
          jobDetail: { ...values, bonus: bonusCompact },
        }))
        goNext()
      }}
      validationSchema={newJobDetailValidationSchema}
    >
      {({ isSubmitting, isValid, submitForm, setFieldTouched }) => {
        return (
          <div className="flex flex-col font-nunito bg-white h-full px-8 py-4 border-2 border-primary w-9/12 transform rounded-xl md:overflow-y-auto">
            <div className="border-b border-gray-500 text-gray-500 text-xl">
              Job Details
            </div>
            <div className="mt-2 py-5 overflow-y-auto space-y-2">
              <div className="flex space-x-10">
                <div className="w-1/3">
                  <JoinDatePicker label="Join Date" />
                </div>
                <div className="w-1/3">
                  <JobTitleSelect />
                </div>
                <div className="w-1/3">
                  <JobDetailsInput fieldName="pit" label="PIT" />
                </div>
              </div>
              <div className="flex space-x-10">
                <div className="w-1/3">
                  <UnitSelect />
                </div>
                <div className="w-1/3">
                  <SalaryGroupSelect />
                </div>
                <div className="w-1/3">
                  <NumberDetailInput fieldName="salary" />
                </div>
              </div>
            </div>
            <div className="border-b border-gray-500 text-gray-500 text-xl">
              Bonus Info
            </div>
            <div className="border-b border-gray-500 flex-grow mt-2 py-5 overflow-y-auto">
              <BonusInfo />
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
