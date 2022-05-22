import { useEmployeeParams } from '@frontend/state/employee-params'
import { useEmployees } from '@frontend/state/employee-queries'
import type { UserInputParams } from '@frontend/types/user'
import { useFormikContext } from 'formik'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
export const EmployeeUserSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { employeeParams } = useEmployeeParams()
  const { employees } = useEmployees(employeeParams)
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<UserInputParams>()
  if (!employees) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Employee
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={employees}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">
                {option.personalDetail.firstName}{' '}
                {option.personalDetail.lastName}
              </p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) =>
          `${option.personalDetail.firstName} ${option.personalDetail.lastName}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name="eid"
            onBlur={handleBlur}
            error={!!errors.eid && touched.eid}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={employees.find((emp) => emp.id === values?.eid)}
        onChange={(_, newValue) => setFieldValue('eid', newValue?.id)}
      />
      {!!errors.eid && touched.eid && (
        <p className="text-danger text-sm font-semibold">{errors.eid}</p>
      )}
    </>
  )
}
