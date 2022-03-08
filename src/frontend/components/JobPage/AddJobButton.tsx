import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { TextInput } from '@frontend/framework/TextInput'
import type { JobDetail, JobInputParams } from '@frontend/types/job'
import { Button, CircularProgress } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import { object, string } from 'yup'
import { JobDetailInput } from './JobDetailInput'

const newJobValidationSchema = object().shape({
  title: string().required('Title is required'),
  description: string().required('Description is required'),
  note: string().required('Note is required'),
})
export const AddJobButton = ({
  renderButton,
  jobDetail,
  isEdit = false,
}: {
  isEdit?: boolean
  jobDetail?: JobDetail
  renderButton: RenderButtonFn
}) => {
  const [edit, setEdit] = useState(isEdit)
  const DEFAULT_JOB: JobInputParams = {
    title: jobDetail?.title || '',
    description: jobDetail?.description || '',
    note: jobDetail?.note || '',
  }
  return (
    <Formik<JobInputParams>
      initialValues={DEFAULT_JOB}
      onSubmit={(
        { description, title, note },
        { setSubmitting, resetForm }
      ) => {
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve('f')
            alert('des :' + description + 'head:' + title + 'name:' + note)
          }, 2000)
        })
        myPromise.then(() => {
          setSubmitting(false)
          if (isEdit) setEdit(true)
          resetForm()
        })
      }}
      validationSchema={newJobValidationSchema}
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
                  Add New Job
                </div>
                <div className="border-b border-gray-500 py-4 flex-grow">
                  <div className="w-full">
                    <TextInput
                      disabled={edit}
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
                      disabled={edit}
                      fieldName="description"
                      label="Job Description"
                      maxRow={3}
                      minRow={3}
                    />
                  </div>
                  <div className="w-full">
                    <JobDetailInput
                      disabled={edit}
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
