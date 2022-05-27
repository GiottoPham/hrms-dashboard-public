import { ShiftDetailTime } from '@components/ShiftPage/ShiftDetailTime'
import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { TextInput } from '@frontend/framework/TextInput'
import { useToast } from '@frontend/framework/Toast'
import { changeTime } from '@frontend/framework/utils/time'
import { useCreateShift, useEditShift } from '@frontend/state/shift-mutation'
import type { Shift, ShiftDetailInput } from '@frontend/types/shift'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import { useRef, useState } from 'react'
import { object, string } from 'yup'

const newShiftValidationSchema = object().shape({
  name: string().required('Name is required'),
  timeIn: string().required('Time in is required'),
  timeOut: string().required('Time out is required'),
})
export const AddShiftButton = ({
  renderButton,
  shiftDetail,
  isEdit = false,
}: {
  isEdit?: boolean
  shiftDetail?: Shift
  renderButton: RenderButtonFn
}) => {
  const [edit, setEdit] = useState(isEdit)
  const DEFAULT_SHIFT: ShiftDetailInput = {
    name: shiftDetail?.name || '',
    timeIn: changeTime(shiftDetail?.timeIn).toISOString(),
    timeOut: changeTime(shiftDetail?.timeOut).toISOString(),
  }
  const closeRef = useRef<HTMLButtonElement>(null)
  const { openToast } = useToast()
  const { editShift } = useEditShift()
  const { createShift } = useCreateShift()
  return (
    <Formik<ShiftDetailInput>
      initialValues={DEFAULT_SHIFT}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const myPromise = !isEdit
          ? createShift(values as ShiftDetailInput)
          : editShift({
              id: shiftDetail?.id as number,
              shift: values as ShiftDetailInput,
            })
        myPromise
          .then(() => {
            openToast(
              isEdit ? 'Edit shift successful' : 'Add new shift successful',
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
            openToast(isEdit ? 'Edit shift failed' : 'Add new shift failed')
          })
          .finally(() => {
            setSubmitting(false)
            if (isEdit) setEdit(true)
            resetForm()
            closeRef.current?.click()
          })
      }}
      validationSchema={newShiftValidationSchema}
    >
      {({
        submitForm,
        setFieldValue,
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        resetForm,
      }) => (
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
              <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-5/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
                <div className="border-b border-gray-500 text-gray-500 text-xl">
                  {isEdit ? 'Edit Shift' : 'Add New Shift'}
                </div>
                <div className="border-b border-gray-500 py-4 flex-grow">
                  <div className="w-full">
                    <TextInput
                      disabled={edit}
                      required
                      fullWidth
                      id="name"
                      label="Shift Title"
                      name={'name'}
                      placeholder={'Shift Title'}
                      value={values.name}
                      error={!!errors.name && touched.name}
                      onChange={(e) => setFieldValue('name', e.target.value)}
                      InputProps={{
                        classes: {
                          root: 'h-10 rounded-lg font-nunito bg-white text-sm',
                        },
                      }}
                    />
                    {!!errors.name && touched.name && (
                      <p className="text-danger text-sm font-semibold">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <ShiftDetailTime
                      disabled={edit}
                      fieldName="timeIn"
                      label="Time In"
                    />
                  </div>
                  <div className="w-full">
                    <ShiftDetailTime
                      disabled={edit}
                      fieldName="timeOut"
                      label="Time Out"
                    />
                  </div>
                </div>
                <div className="self-end mt-5">
                  <Button
                    ref={closeRef}
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
                      disabled={!isValid || isSubmitting}
                      onClick={submitForm}
                      type="submit"
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
      )}
    </Formik>
  )
}
