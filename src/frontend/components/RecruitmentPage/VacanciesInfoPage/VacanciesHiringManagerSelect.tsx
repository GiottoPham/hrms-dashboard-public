import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import type { VacanciesEditParams } from '@frontend/types/vacancies-info'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const VacanciesHiringManagerSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { employeeParams } = useEmployeeParams()
  const { employees = [] } = useEmployees(employeeParams)
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<VacanciesEditParams>()
  if (!employees) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Hiring Manager
      </InputLabel>
      <Autocomplete
        disabled={disabled}
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
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) =>
          `${option.personalDetail?.firstName} ${option.personalDetail?.lastName}`
        }
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
        value={employees.find((emp) => emp.id === values?.hiringManagerId)}
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
