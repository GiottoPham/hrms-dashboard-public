import { useUnits } from '@frontend/state/unit-queries'
import type { VacanciesEditParams } from '@frontend/types/vacancies-info'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const VacanciesUnitSelect = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { units } = useUnits(false)
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<VacanciesEditParams>()
  if (!units) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Unit
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={units}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">{option.name}</p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            name="departmentId"
            onBlur={handleBlur}
            error={!!errors.departmentId && touched.departmentId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={units.find((unit) => unit.id === values?.departmentId)}
        onChange={(_, newValue) => setFieldValue('departmentId', newValue?.id)}
      />
      {!!errors.departmentId && touched.departmentId && (
        <p className="text-danger text-sm font-semibold">
          {errors.departmentId}
        </p>
      )}
    </>
  )
}
