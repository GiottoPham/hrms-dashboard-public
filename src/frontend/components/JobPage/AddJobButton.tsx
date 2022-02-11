import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { TextInput } from '@frontend/framework/TextInput'
import type { JobInputParams } from '@frontend/types/job'
import { Button } from '@mui/material'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { JobDetailInput } from './JobDetailInput'
const DEFAULT_JOB: JobInputParams = {
  title: '',
  description: '',
  note: '',
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const newUserValidationSchema = object().shape({
  title: string().required(),
  description: string().required(),
  note: string(),
})
export const AddJobButton = ({
  renderButton,
}: {
  renderButton: RenderButtonFn
}) => {
  return (
    <Formik<JobInputParams>
      initialValues={DEFAULT_JOB}
      onSubmit={() => {
        //
      }}
    >
      {({ submitForm, setFieldValue, values, errors, touched }) => (
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
              <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-5/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
                <div className="border-b border-gray-500 text-gray-500 text-xl">
                  Add New Job
                </div>
                <div className="border-b border-gray-500 mt-2 pb-5">
                  <div className="w-full">
                    <TextInput
                      required
                      fullWidth
                      id="title"
                      label="Job Title"
                      name={'title'}
                      placeholder={'Job Title'}
                      value={values.title}
                      error={!!errors.title && touched.title}
                      onChange={(e) => setFieldValue('title', e.target.value)}
                      InputProps={{
                        classes: {
                          root: 'h-10 rounded-lg font-nunito bg-white text-sm',
                        },
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <JobDetailInput
                      fieldName="description"
                      label="Job Description"
                      maxRow={3}
                      minRow={3}
                    />
                  </div>
                  <div className="w-full">
                    <JobDetailInput
                      fieldName="note"
                      label="Note"
                      maxRow={3}
                      minRow={3}
                    />
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
