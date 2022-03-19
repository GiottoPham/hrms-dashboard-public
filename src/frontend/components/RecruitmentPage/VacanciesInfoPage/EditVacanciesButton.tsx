import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { TextInput } from '@frontend/framework/TextInput'
import type {
  VacanciesEditParams,
  VacanciesInfo,
} from '@frontend/types/vacancies-info'
import { Button, CircularProgress, TextareaAutosize } from '@mui/material'
import { Formik } from 'formik'
import { number, object, string } from 'yup'
import type { PartialDeep } from 'type-fest'
import { VacanciesUnitSelect } from '@components/RecruitmentPage/VacanciesInfoPage/VacanciesUnitSelect'
import { VacanciesExpiredDate } from '@components/RecruitmentPage/VacanciesInfoPage/VacanciesExpiredDate'
import { useRef, useState } from 'react'
import { VacanciesHiringManagerSelect } from '@components/RecruitmentPage/VacanciesInfoPage/VacanciesHiringManagerSelect'
import { VacanciesJobSelect } from '@components/RecruitmentPage/VacanciesInfoPage/VacanciesJobSelect'
import cx from 'classnames'
import { useToast } from '@frontend/framework/Toast'
export const EditVacanciesButton = ({
  renderButton,
  vacanciesInfo,
  isEdit = false,
}: {
  renderButton: RenderButtonFn
  vacanciesInfo?: VacanciesInfo
  isEdit?: boolean
}) => {
  const { openToast } = useToast()
  const refModal = useRef<HTMLButtonElement>(null)
  const [edit, setEdit] = useState(isEdit ? true : false)
  const DEFAULT_VACANCIES: PartialDeep<VacanciesEditParams> = {
    hiringManagerId: vacanciesInfo?.hiringManagerId,
    positionId: vacanciesInfo?.positionId,
    departmentId: vacanciesInfo?.departmentId,
    publishedDate: vacanciesInfo?.publishedDate || new Date().toISOString(),
    expiredDate: vacanciesInfo?.expiredDate || new Date().toISOString(),
    postContent: vacanciesInfo?.postContent || '',
    quantity: vacanciesInfo?.quantity || '1',
    status: vacanciesInfo?.status || 0,
  }

  const newVacanciesValidationSchema = object().shape({
    hiringManagerId: number().required('Select a hiring manager'),
    positionId: number().required('Select a job'),
    departmentId: number().required('Select a unit'),
    publishedDate: string().required(),
    expiredDate: string().required(),
    postContent: string().required(),
    status: number().required(),
  })
  return (
    <Formik
      initialValues={DEFAULT_VACANCIES}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const myPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve(values)
          }, 2000)
        })
        myPromise.then(() => {
          setSubmitting(false)
          if (isEdit) setEdit(true)
          resetForm()
          openToast(
            isEdit ? 'Edit vacancies successful' : 'Add new vacancy successful',
            {
              variant: 'success',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
            }
          )
          refModal.current?.click()
        })
      }}
      validationSchema={newVacanciesValidationSchema}
    >
      {({
        submitForm,
        setFieldValue,
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        getFieldProps,
        resetForm,
      }) => {
        return (
          <ButtonWithModal
            renderButton={renderButton}
            renderModal={({ Modal, isOpen, closeModal }) => (
              <Modal
                open={isOpen}
                onClose={() => {
                  closeModal()
                  resetForm()
                  if (isEdit) setEdit(true)
                }}
                closeAfterTransition
                disableScrollLock
                onBackdropClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-7/12 xl:w-6/12 md:h-5/6 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
                  <div className="border-b border-gray-500 text-gray-500 text-xl">
                    Add New Vacancies
                  </div>
                  <div className="border-b border-gray-500 py-4 flex-grow">
                    <div className="w-full flex space-x-5">
                      <div className="w-1/2">
                        <VacanciesJobSelect disabled={edit} />
                      </div>
                      <div className="w-1/2">
                        <VacanciesUnitSelect disabled={edit} />
                      </div>
                    </div>

                    <div className="w-full flex space-x-5 mt-5">
                      <div className="w-1/2">
                        <VacanciesExpiredDate disabled={edit} />
                      </div>
                      <div className="w-1/2">
                        <TextInput
                          type="number"
                          disabled={edit}
                          required
                          fullWidth
                          id="quantity"
                          label="Quantity"
                          name="quantity"
                          value={values.quantity}
                          error={!!errors.quantity && touched.quantity}
                          onChange={(e) =>
                            setFieldValue('quantity', e.target.value)
                          }
                          InputProps={{
                            classes: {
                              root: 'h-10 rounded-lg font-nunito bg-white text-sm',
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 mt-5">
                      <VacanciesHiringManagerSelect disabled={edit} />
                    </div>
                    <div className="w-full">
                      <span className="text-sm font-nunito font-bold text-black pl-[1px] mb-1">
                        Post Content
                      </span>
                      <TextareaAutosize
                        disabled={edit}
                        className={cx('w-full border p-2 rounded-lg text-sm', {
                          'border-danger':
                            !!errors.postContent && touched.postContent,
                          'border-gray-400': !errors.postContent,
                          'text-gray-500': edit,
                        })}
                        minRows={3}
                        maxRows={3}
                        {...getFieldProps('postContent')}
                      />
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
        )
      }}
    </Formik>
  )
}
