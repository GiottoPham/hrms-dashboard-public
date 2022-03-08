import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DesktopDatePicker } from '@mui/lab'
import { InputLabel } from '@mui/material'
import { useFormikContext } from 'formik'
import type { VacanciesEditParams } from '@frontend/types/vacancies-info'
export const VacanciesExpiredDate = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {
  const { values, setFieldValue } = useFormikContext<VacanciesEditParams>()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Expired Date
      </InputLabel>
      <DesktopDatePicker
        disabled={disabled}
        autoFocus={false}
        value={values.expiredDate}
        onChange={(newValue) => {
          if (newValue) setFieldValue('expiredDate', newValue)
        }}
        renderInput={(params) => (
          <TextField
            disabled={disabled}
            fullWidth
            {...params}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm',
              },
              ...params.InputProps,
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}
