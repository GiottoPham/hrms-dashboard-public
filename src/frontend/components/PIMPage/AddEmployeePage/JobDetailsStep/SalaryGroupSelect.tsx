import type { JobDetailInputParams } from '@frontend/types/employee'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const SalaryGroupSelect = () => {
  const salaryGroup = [
    {
      id: 1,
      title: 'Employee - LV.1',
      coefficient: 1,
    },
    {
      id: 2,
      title: 'Employee - LV.2',
      coefficient: 3,
    },
    {
      id: 3,
      title: 'Employee - LV.3',
      coefficient: 4,
    },
    {
      id: 4,
      title: 'Manager - LV.1',
      coefficient: 5,
    },
    {
      id: 5,
      title: 'Manager - LV.2',
      coefficient: 6,
    },
  ]
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<JobDetailInputParams>()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Salary Group
      </InputLabel>
      <Autocomplete
        options={salaryGroup}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">{option.title}</p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            name="salaryGroup"
            onBlur={handleBlur}
            error={!!errors.salaryGroup && touched.salaryGroup}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={salaryGroup.find((item) => item.id === values.salaryGroup)}
        onChange={(_, newValue) => setFieldValue('salaryGroup', newValue?.id)}
      />
      {!!errors.salaryGroup && touched.salaryGroup && (
        <p className="text-danger text-sm font-semibold">
          {errors.salaryGroup}
        </p>
      )}
    </>
  )
}
