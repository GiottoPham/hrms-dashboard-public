import { HeadOfUnitSelect } from '@components/OrganizationPage/HeadOfUnitSelect'
import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { TextInput } from '@frontend/framework/TextInput'
import { useToast } from '@frontend/framework/Toast'
import { useCreateUnit } from '@frontend/state/unit-mutation'
import type { UnitInputParams } from '@frontend/types/unit'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import { useRef } from 'react'
import { object, string, number } from 'yup'
import { UnitDetailInput } from './UnitDetailInput'
const newUnitValidationSchema = object().shape({
  name: string().required('Name must not be empty'),
  description: string().required('Description must not be empty'),
  managerOfUnitId: number().required('Please select one of the employees'),
  headOfUnitId: number().required(),
})
export const AddUnitButton = ({
  id,
  renderButton,
  closePopover,
}: {
  id: number
  renderButton: RenderButtonFn
  closePopover: () => void
}) => {
  const DEFAULT_UNIT: Partial<UnitInputParams> = {
    name: '',
    description: '',
    headOfUnitId: id,
    managerOfUnitId: undefined,
  }
  const closeRef = useRef<HTMLButtonElement>(null)
  const { openToast } = useToast()
  const { createUnit } = useCreateUnit()
  return (
    <Formik
      initialValues={DEFAULT_UNIT}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createUnit(values as UnitInputParams).finally(() => {
          setSubmitting(false)
          resetForm()
          openToast('Add new sub-unit successful', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          })
          closeRef.current?.click()
        })
      }}
      validationSchema={newUnitValidationSchema}
    >
      {({
        submitForm,
        setFieldValue,
        values,
        errors,
        resetForm,
        isValid,
        isSubmitting,
        touched,
        handleBlur,
      }) => {
        return (
          <ButtonWithModal
            renderButton={renderButton}
            renderModal={({ Modal, isOpen, closeModal }) => (
              <Modal
                open={isOpen}
                onClose={() => {
                  resetForm()
                  closeModal()
                  closePopover()
                }}
                closeAfterTransition
                disableScrollLock
                onBackdropClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-4/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
                  <div className="border-b border-gray-500 text-gray-500 text-xl">
                    Add Sub Unit
                  </div>
                  <div className="border-b border-gray-500 py-3">
                    <div className="w-full">
                      <TextInput
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        placeholder={'Unit Name'}
                        value={values.name}
                        onBlur={handleBlur}
                        error={!!errors.name && touched.name}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        InputProps={{
                          classes: {
                            root: 'h-10 rounded-lg font-nunito bg-white text-sm',
                          },
                        }}
                      />
                    </div>
                    {!!errors.name && touched.name && (
                      <p className="text-danger text-sm font-semibold">
                        {errors.name}
                      </p>
                    )}
                    <div className="w-full pt-2">
                      <HeadOfUnitSelect />
                    </div>
                    <div className="w-full mt-2">
                      <UnitDetailInput
                        onBlur={handleBlur}
                        fieldName="description"
                        label="Unit Description"
                        maxRows={3}
                        minRows={3}
                      />
                    </div>
                    {!!errors.description && touched.description && (
                      <p className="text-danger text-sm font-semibold">
                        {errors.description}
                      </p>
                    )}
                  </div>
                  <div className="self-end mt-5">
                    <Button
                      ref={closeRef}
                      classes={{
                        root: 'rounded-full font-nunito normal-case shadow-none w-24 text-primary mr-5',
                      }}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        resetForm()
                        closeModal()
                        closePopover()
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      classes={{
                        root: 'rounded-full font-nunito normal-case shadow-none w-24 text-white',
                      }}
                      color="primary"
                      variant="contained"
                      disabled={!isValid || isSubmitting}
                      onClick={() => {
                        submitForm()
                      }}
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
