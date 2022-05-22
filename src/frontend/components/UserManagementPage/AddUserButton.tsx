import { StatusInput } from '@components/UserManagementPage/StatusInput'
import { UserPasswordInput } from '@components/UserManagementPage/UserPasswordInput'
import { UserRoleSelect } from '@components/UserManagementPage/UserRoleSelect'
import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { useToast } from '@frontend/framework/Toast'
import { useCreateUser, useEditUser } from '@frontend/state/user-mutation'
import { UserDetail, UserInputParams, UserStatus } from '@frontend/types/user'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import { useRef, useState } from 'react'
import type { PartialDeep } from 'type-fest'
import { object, string, number } from 'yup'
import { UserInput } from './UserInput'

const newUserValidationSchema = object().shape({
  username: string().required('Username is required'),
  roleid: number().required('Please select one of the roles'),
  status: string().required(),
  password: string().required('Password is required'),
})
export const AddUserButton = ({
  userDetail,
  renderButton,
  isEdit = false,
}: {
  isEdit?: boolean
  userDetail?: UserDetail
  renderButton: RenderButtonFn
}) => {
  const DEFAULT_USER: PartialDeep<UserInputParams> = {
    username: userDetail?.username || '',
    password: userDetail?.password || '',
    status: userDetail?.status
      ? userDetail.status.toString() === 'ENABLE'
        ? UserStatus.Enable
        : UserStatus.Disable
      : UserStatus.Enable,
    roleid: userDetail?.roleid,
    eid: userDetail?.eid,
  }
  const [edit, setEdit] = useState(isEdit)
  const { openToast } = useToast()
  const refModal = useRef<HTMLButtonElement>(null)
  const { createUser } = useCreateUser()
  const { editUser } = useEditUser()
  return (
    <Formik
      initialValues={DEFAULT_USER}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const myPromise = !isEdit
          ? createUser(values as UserInputParams)
          : editUser({
              id: userDetail?.id as number,
              userParams: values as UserInputParams,
            })
        myPromise
          .then(() => {
            openToast(
              isEdit ? 'Edit user successful' : 'Add new user successful',
              {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'right',
                },
              }
            )
          })
          .catch(() => {
            openToast(isEdit ? 'Edit user failed' : 'Add new user failed')
          })
          .finally(() => {
            setSubmitting(false)
            if (isEdit) setEdit(true)
            resetForm()
            refModal.current?.click()
          })
      }}
      validationSchema={newUserValidationSchema}
    >
      {({ submitForm, isSubmitting, isValid, resetForm }) => {
        return (
          <ButtonWithModal
            renderButton={renderButton}
            renderModal={({ Modal, isOpen, closeModal }) => (
              <Modal
                open={isOpen}
                onClose={() => {
                  closeModal()
                  if (isEdit) setEdit(true)
                  resetForm()
                }}
                closeAfterTransition
                disableScrollLock
                onBackdropClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-4/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
                  <div className="border-b border-gray-500 text-gray-500 text-xl">
                    {isEdit ? 'Edit User' : 'Add User'}
                  </div>
                  <div className="border-b border-gray-500 flex-grow mt-2">
                    <div className="flex flex-row justify-between space-x-10">
                      <div className="w-1/2">
                        <UserInput
                          fieldName="username"
                          label="Username"
                          disabled={edit}
                        />
                      </div>
                      <div className="w-1/2">
                        <UserRoleSelect disabled={edit} />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between space-x-10 mt-2">
                      <div className="w-1/2">
                        <StatusInput disabled={edit} />
                      </div>
                    </div>
                    <div className="bg-gray-200 px-5 py-4 w-1/2 mt-2 rounded-lg">
                      <UserPasswordInput disabled={edit} />
                    </div>
                  </div>
                  <div className="self-end mt-5">
                    <Button
                      ref={refModal}
                      classes={{
                        root: 'rounded-full font-nunito normal-case shadow-none w-24 text-primary mr-5',
                      }}
                      color="primary"
                      variant="outlined"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                    {!edit ? (
                      <Button
                        classes={{
                          root: 'rounded-full font-nunito normal-case shadow-none w-24 text-white',
                        }}
                        color="primary"
                        variant="contained"
                        onClick={submitForm}
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
                        onClick={() => setEdit(false)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </Modal>
            )}
          ></ButtonWithModal>
        )
      }}
    </Formik>
  )
}
