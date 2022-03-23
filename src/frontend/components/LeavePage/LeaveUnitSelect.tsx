import { useLeaveParams } from '@frontend/state/leave-params'
import { useUnits } from '@frontend/state/unit-queries'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
export const LeaveUnitSelect = () => {
  const { leaveParams, setLeaveParams } = useLeaveParams()
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
        value={units.find((unit) => unit.id === leaveParams?.departmentId)}
        onChange={(_, newValue) => {
          if (newValue)
            setLeaveParams((prev) => ({ ...prev!, departmentId: newValue.id }))
        }}
      />
    </>
  )
}
