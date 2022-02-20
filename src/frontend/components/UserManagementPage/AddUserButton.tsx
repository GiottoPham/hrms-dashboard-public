import { StatusInput } from '@components/UserManagementPage/StatusInput'
import { UserPasswordInput } from '@components/UserManagementPage/UserPasswordInput'
import { UserRoleSelect } from '@components/UserManagementPage/UserRoleSelect'
import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { UserInputParams, UserStatus } from '@frontend/types/user'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import type { PartialDeep } from 'type-fest'
import { object, string } from 'yup'
import { UserInput } from './UserInput'
const DEFAULT_USER: PartialDeep<UserInputParams> = {
  username: '',
  password: '',
  userStatus: UserStatus.Enable,
}

const newUserValidationSchema = object().shape({
  name: string().required(),
  username: string().required(),
  role: string().required(),
  userStatus: string().required(),
  password: string().required(),
})
export const AddUserButton = ({
  renderButton,
}: {
  renderButton: RenderButtonFn
}) => {
  return (
    <Formik
      initialValues={DEFAULT_USER}
      onSubmit={(
        { username, roleId, password, userStatus },
        { setSubmitting }
      ) => {
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve('f')
            alert('hello' + username + roleId + password + userStatus)
          }, 2000)
        })
        myPromise.then(() => {
          setSubmitting(false)
        })
      }}
      validationSchema={newUserValidationSchema}
    >
      {({ submitForm, isSubmitting, isValid }) => (
        <ButtonWithModal
          renderButton={renderButton}
          renderModal={({ Modal, isOpen, closeModal }) => (
            <Modal
              open={isOpen}
              onClose={closeModal}
              closeAfterTransition
              disableScrollLock
              onBackdropClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-4/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
                <div className="border-b border-gray-500 text-gray-500 text-xl">
                  Add User
                </div>
                <div className="border-b border-gray-500 flex-grow mt-2">
                  <div className="flex flex-row justify-between space-x-10">
                    <div className="w-1/2">
                      <UserInput fieldName="username" label="Username" />
                    </div>
                    <div className="w-1/2">
                      <UserRoleSelect />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between space-x-10 mt-5">
                    <div className="w-1/2">
                      <StatusInput />
                    </div>
                  </div>
                  <div className="bg-gray-200 px-5 pt-5 pb-7 w-2/3 mt-5 rounded-lg">
                    <UserPasswordInput />
                  </div>
                </div>
                <div className="self-end mt-5">
                  <Button
                    classes={{
                      root: 'rounded-full font-nunito normal-case shadow-none w-24 text-primary mr-5',
                    }}
                    color="primary"
                    variant="outlined"
                    onClick={closeModal}
                  >
                    Close
                  </Button>
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
                </div>
              </div>
            </Modal>
          )}
        ></ButtonWithModal>
      )}
    </Formik>
  )
}
