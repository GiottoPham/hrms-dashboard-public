import { useFormikContext } from 'formik'
import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { InputLabel, TextField } from '@mui/material'
import type { ShiftDetailInput } from '@frontend/types/shift'
export const ShiftDetailTime = ({
  fieldName,
  label,
  disabled = false,
}: {
  fieldName: keyof ShiftDetailInput
  label: string
  disabled?: boolean
}) => {
  const { values, setFieldValue } = useFormikContext<ShiftDetailInput>()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        {label}
      </InputLabel>
      <TimePicker
        ampm={false}
        disabled={disabled}
        value={new Date(values[fieldName])}
        onChange={(newValue) => {
          if (newValue) {
            setFieldValue(fieldName, newValue.toISOString())
          }
        }}
        renderInput={(params) => (
          <TextField
            disabled={disabled}
            fullWidth
            {...params}
            InputProps={{
              classes: { root: 'h-10 rounded-lg font-nunito bg-white text-sm' },
              ...params.InputProps,
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}
