import { useAttendanceParams } from '@frontend/state/attendance-params'
import { useUnits } from '@frontend/state/unit-queries'
import { Autocomplete, InputLabel, TextField } from '@mui/material'

export const UnitSelect = () => {
  const { attendanceParams, setAttendanceParams } = useAttendanceParams()
  const { units } = useUnits(false)
  if (!units) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Select Unit
      </InputLabel>
      <Autocomplete
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
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={units.find((unit) => unit.id === attendanceParams?.departmentId)}
        onChange={(_, newValue) => {
          if (newValue)
            setAttendanceParams((prev) => ({
              ...prev!,
              departmentId: newValue.id,
            }))
        }}
      />
    </>
  )
}
