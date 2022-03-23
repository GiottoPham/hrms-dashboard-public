import { useAddEmployeeForm } from '@frontend/state/add-employee-form'
import type {
  AssignAccountInputParams,
  JobDetailInputParams,
  PersonalDetailInputParams,
} from '@frontend/types/employee'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import type { PartialDeep } from 'type-fest'
import { object, string, mixed } from 'yup'
import { AccountStatusSelect } from '@components/PIMPage/AddEmployeePage/AssignAccountStep/AccountStatusSelect'
import { AccountInput } from '@components/PIMPage/AddEmployeePage/AssignAccountStep/AccountInput'
import { NewAccountStatusInput } from '@components/PIMPage/AddEmployeePage/AssignAccountStep/NewAccountStatusInput'
import { RoleSelect } from '@components/PIMPage/AddEmployeePage/AssignAccountStep/RoleSelect'
import { NewPasswordInput } from '@components/PIMPage/AddEmployeePage/AssignAccountStep/NewPasswordInput'
import { AccountSelect } from '@components/PIMPage/AddEmployeePage/AssignAccountStep/AccountSelect'
import { useToast } from '@frontend/framework/Toast'
import { useCreateEmployee } from '@frontend/state/employee-mutation'
const newUserValidationSchema = object()
  .shape({
    username: string().required('User name is required'),
    roleid: mixed().required('Select one of the roles'),
    status: string().required(),
    password: string().required('Password is required'),
  })
  .nullable()

const newAccountValidationSchema = object().shape({
  type: string().required(),
  accountId: mixed()
    .nullable()
    .test('heho', 'Please choose an account', (accountId) => {
      return accountId === null || accountId !== undefined
    }),

  newAccount: newUserValidationSchema,
})
export const AssignAccountStep = ({
  goBack,
  goReset,
}: {
  goBack: () => void
  goReset: () => void
}) => {
  const {
    employeeParams: { accountDetail, jobDetail, personalDetail },
  } = useAddEmployeeForm()
  const DEFAULT_ACCOUNT_DETAIL: PartialDeep<AssignAccountInputParams> = {
    type: accountDetail?.type || 'available',
    accountId:
      accountDetail?.type || 'available' === 'available'
        ? accountDetail?.accountId
        : accountDetail?.accountId || null,
    newAccount:
      accountDetail?.type || 'available' === 'available'
        ? accountDetail?.newAccount || null
        : accountDetail?.newAccount,
  }
  const { openToast } = useToast()
  const { createEmployee } = useCreateEmployee()
  return (
    <Formik
      initialValues={DEFAULT_ACCOUNT_DETAIL}
      onSubmit={(values, { setSubmitting }) => {
        const newAccountValues = {
          ...values?.newAccount,
          status: values?.newAccount?.status?.toUpperCase(),
        }
        const newValues = values.newAccount
          ? { ...values, newAccount: newAccountValues }
          : values
        createEmployee({
          accountDetail: newValues as AssignAccountInputParams,
          jobDetail: jobDetail as JobDetailInputParams,
          personalDetail: personalDetail as PersonalDetailInputParams,
        }).then(() => {
          setSubmitting(false)
          goReset()
          openToast('Add new employee successful', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
        })
      }}
      validationSchema={newAccountValidationSchema}
    >
      {({ isSubmitting, isValid, submitForm, values }) => {
        return (
          <div className="flex flex-col font-nunito bg-white h-full px-8 py-2 w-1/2 transform rounded-xl md:overflow-y-auto">
            <div className="border-b border-gray-500 text-gray-500 text-xl">
              Assign Account
            </div>
            <div className="mt-2 py-5 overflow-y-auto">
              <div className="w-full flex justify-center py-2">
                <AccountStatusSelect />
              </div>

              {values.type === 'new' ? (
                <div>
                  <div className="border-b border-gray-500 text-gray-500 text-xl">
                    New Account Info
                  </div>
                  <div className="flex space-x-10 py-5">
                    <div className="w-1/2">
                      <AccountInput fieldName="username" label="User Name" />
                    </div>
                    <div className="w-1/2">
                      <RoleSelect />
                    </div>
                  </div>
                  <div className="flex space-x-10">
                    <div className="w-1/2">
                      <NewAccountStatusInput />
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                  <div className="bg-gray-200 px-5 pt-5 pb-7 w-1/2 mt-2 rounded-lg">
                    <NewPasswordInput />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="border-b border-gray-500 text-gray-500 text-xl">
                    List Available Accounts
                  </div>
                  <div className="flex w-full flex-col py-5">
                    <AccountSelect />
                  </div>
                </div>
              )}
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
                Finish
              </Button>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}
