import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { TextInput } from '@frontend/framework/TextInput'
import type { UnitInputParams } from '@frontend/types/unit'
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from '@mui/material'
import { Formik } from 'formik'
import { object, string, number } from 'yup'
import { UnitDetailInput } from './UnitDetailInput'
const DEFAULT_UNIT: Partial<UnitInputParams> = {
  name: '',
  description: '',
}
const newUnitValidationSchema = object().shape({
  name: string().required('Name must not be empty'),
  description: string().required('Description must not be empty'),
  headOfUnitId: number().required('Head of unit must not be empty'),
})
export const AddUnitButton = ({
  renderButton,
  closePopover,
}: {
  renderButton: RenderButtonFn
  closePopover: () => void
}) => {
  const EMPLOYEE = [
    { id: 1, name: 'Pham Gia Nguyen' },
    { id: 2, name: 'Pham Khang Nguyen' },
    { id: 3, name: 'Truong Anh Bao' },
  ]

  return (
    <Formik
      validateOnMount
      initialValues={DEFAULT_UNIT}
      onSubmit={({ description, headOfUnitId, name }, { setSubmitting }) => {
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve('f')
            alert(
              'des :' + description + 'head:' + headOfUnitId + 'name:' + name
            )
          }, 2000)
        })
        myPromise.then(() => {
          setSubmitting(false)
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
                      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
                        Head Of Unit
                      </InputLabel>
                      <Select
                        name="headOfUnitId"
                        onBlur={handleBlur}
                        fullWidth
                        value={values.headOfUnitId}
                        onChange={(e) =>
                          setFieldValue('headOfUnitId', e.target.value)
                        }
                        componentsProps={{
                          root: {
                            className: 'font-nunito text-sm rounded-lg h-10 ',
                          },
                          input: {
                            className: 'w-full py-1.5',
                          },
                        }}
                      >
                        {EMPLOYEE.map(({ id, name }) => (
                          <MenuItem
                            key={id}
                            value={id}
                            className="font-nunito text-sm"
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    {!!errors.headOfUnitId && touched.headOfUnitId && (
                      <p className="text-danger text-sm font-semibold">
                        Please select on of the employees
                      </p>
                    )}
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
