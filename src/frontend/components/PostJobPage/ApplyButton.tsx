import { ApplyTextInput } from '@components/PostJobPage/ApplyTextInput'
import { DateOfBirthSelect } from '@components/PostJobPage/DateOfBirthSelect'
import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { PhoneNumberInput } from '@frontend/framework/PhoneNumberInput'
import { useToast } from '@frontend/framework/Toast'
import type { CandidateInputParams } from '@frontend/types/candidate'
import type { NewVacanciesInfo } from '@frontend/types/vacancies-info'
import { Button, CircularProgress, InputLabel } from '@mui/material'
import { Formik } from 'formik'
import { useRef } from 'react'
import type { PartialDeep } from 'type-fest'
import { number, object, string, mixed } from 'yup'
import FileUpload from 'react-material-file-upload'
import { useCreateCandidate } from '@frontend/state/candidate-mutation'

export const ApplyButton = ({
  vacancies,
  renderButton,
}: {
  vacancies: NewVacanciesInfo
  renderButton: RenderButtonFn
}) => {
  const newCandidateValidationSchema = object().shape({
    jobRecruitmentId: number().required(),
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    dateOfBirth: string().required(),
    email: string().required('Email is required'),
    contact: string().required('Phone is required'),
    file: mixed().required(),
  })
  const DEFAULT_CANDIDATE: PartialDeep<CandidateInputParams> = {
    jobRecruitmentId: vacancies.id,
    firstName: '',
    lastName: '',
    dateOfBirth: new Date().toISOString(),
    email: '',
    contact: '',
  }
  const closeRef = useRef<HTMLButtonElement>(null)
  const { openToast } = useToast()
  const { createCandidate } = useCreateCandidate()
  return (
    <Formik
      initialValues={DEFAULT_CANDIDATE}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createCandidate(values as CandidateInputParams)
          .then(() => {
            openToast('Apply successful', {
              variant: 'success',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            })
          })
          .catch(() => {
            openToast('Apply failed')
          })
          .finally(() => {
            setSubmitting(false)
            resetForm()
            closeRef.current?.click()
          })
      }}
      validationSchema={newCandidateValidationSchema}
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
                resetForm()
              }}
              closeAfterTransition
              disableScrollLock
              onBackdropClick={(e) => {
                e.stopPropagation()
              }}
            >
              <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-5/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
                <div className="border-b border-gray-500 text-xl font-bold">
                  Apply for{' '}
                  <span className="text-primary">
                    {vacancies.positionTitle}
                  </span>
                </div>
                <div className="py-2 h-full">
                  <div className="flex space-x-10 mt-2 ">
                    <div className="w-1/2">
                      <ApplyTextInput
                        label="First Name"
                        fieldName="firstName"
                      />
                    </div>
                    <div className="w-1/2">
                      <ApplyTextInput label="Last Name" fieldName="lastName" />
                    </div>
                  </div>
                  <div className="flex space-x-10 mt-2">
                    <div className="w-1/2">
                      <ApplyTextInput label="Email" fieldName="email" />
                    </div>
                    <div className="w-1/2">
                      <DateOfBirthSelect label="Date of birth" />
                    </div>
                  </div>
                  <div className="flex space-x-10 mt-2">
                    <div className="w-1/2">
                      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
                        Phone number
                      </InputLabel>
                      <PhoneNumberInput
                        name="phone"
                        id="phone-number-input"
                        placeholder="Phone number"
                        defaultCountry="VN"
                        value={values.contact}
                        isError={!!errors.contact && touched.contact}
                        onChange={(phone) =>
                          setFieldValue('contact', phone || '')
                        }
                      />
                      {!!errors.contact && touched.contact && (
                        <p className="text-danger text-sm font-semibold">
                          {errors.contact}
                        </p>
                      )}
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                  <div className=" mt-5">
                    <FileUpload
                      value={values.file ? ([values.file] as File[]) : []}
                      onChange={(files) => setFieldValue('file', files[0])}
                      title="Please upload your CV. Accept only 1 file pdf or docx"
                      buttonProps={{
                        classes: {
                          root: 'rounded-full font-nunito normal-case shadow-none w-24 text-white',
                        },
                      }}
                      accept={['.pdf', '.docx']}
                      maxFiles={1}
                      onDropRejected={() =>
                        openToast('Incorrect files', {
                          variant: 'error',
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right',
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5 space-x-5">
                  <Button
                    classes={{
                      root: 'rounded-full font-nunito normal-case shadow-none w-24',
                    }}
                    ref={closeRef}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      resetForm()
                      closeModal()
                    }}
                  >
                    Cancel
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
