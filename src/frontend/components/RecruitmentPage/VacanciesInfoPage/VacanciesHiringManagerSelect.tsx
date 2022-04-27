import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import type { VacanciesEditParams } from '@frontend/types/vacancies-info'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'

export const VacanciesHiringManagerSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { employeeParams } = useEmployeeParams()
  const { employees: employeeList } = useEmployees(employeeParams)
  const { initialValues, values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<VacanciesEditParams>()
  const employees =
    employeeList?.filter(
      (emp) => emp.jobDetail.departmentId === values?.departmentId
    ) || []
  const val = employees.find((emp) => emp.id === values?.hiringManagerId)
  useEffect(() => {
    if (!initialValues.hiringManagerId)
      setFieldValue('hiringManagerId', undefined)
  }, [initialValues.hiringManagerId, setFieldValue, values.departmentId])
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Hiring Manager
      </InputLabel>
      <Autocomplete
        disabled={disabled || !values.departmentId}
        options={employees}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">
                {option.personalDetail?.firstName}{' '}
                {option.personalDetail?.lastName}
              </p>
            </li>
          )
        }}
        getOptionLabel={(option) => {
          if (option.jobDetail.departmentId === values.departmentId)
            return `${option.personalDetail?.firstName} ${option.personalDetail?.lastName}`
          else return ''
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="hiringManagerId"
            onBlur={handleBlur}
            error={!!errors.hiringManagerId && touched.hiringManagerId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={val}
        onChange={(_, newValue) =>
          setFieldValue('hiringManagerId', newValue?.id)
        }
      />
      {!!errors.hiringManagerId && touched.hiringManagerId && (
        <p className="text-danger text-sm font-semibold">
          {errors.hiringManagerId}
        </p>
      )}
    </>
  )
}
