import type {
  InsuranceCommon,
  InsuranceInputParams,
} from '@frontend/types/employee'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const DateInput = ({
  label,
  insurance,
  insuranceDetail,
  disabled = false,
}: {
  disabled?: boolean
  label: string
  insurance: keyof InsuranceInputParams
  insuranceDetail: keyof InsuranceCommon
}) => {
  const { values, setFieldValue } = useFormikContext<InsuranceInputParams>()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        {label}
      </InputLabel>
      <DesktopDatePicker
        disabled={disabled}
        autoFocus={false}
        value={
          (insurance === 'health'
            ? values.health[insuranceDetail]
            : insurance === 'social'
            ? values.social[insuranceDetail]
            : values.unemployment[insuranceDetail]) || new Date().toString()
        }
        onChange={(newValue) => {
          if (newValue)
            setFieldValue(
              `${insurance}.${insuranceDetail}`,
              new Date(newValue).toISOString()
            )
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
