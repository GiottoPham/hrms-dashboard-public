import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'
export const BirthdayPicker = ({ label }: { label: string }) => {
  const { values, setFieldValue } =
    useFormikContext<PersonalDetailInputParams>()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        {label}
      </InputLabel>
      <DesktopDatePicker
        autoFocus={false}
        value={values.dateOfBirth}
        onChange={(newValue) => {
          if (newValue)
            setFieldValue('dateOfBirth', new Date(newValue).toISOString())
        }}
        renderInput={(params) => (
          <TextField
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
