import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DesktopDatePicker } from '@mui/lab'
import { InputLabel } from '@mui/material'
import { usePayrollParams } from '@frontend/state/payroll-params'

export const MonthPayrollFilter = () => {
  const { setPayrollParams, payrollParams } = usePayrollParams()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Select month
      </InputLabel>
      <DesktopDatePicker
        views={['month', 'year']}
        autoFocus={false}
        value={payrollParams?.month || new Date().toISOString()}
        onChange={(newValue) => {
          if (newValue)
            setPayrollParams((prev) => ({
              ...prev!,
              month: newValue,
            }))
        }}
        inputFormat="MMMM yyyy"
        renderInput={(params) => (
          <TextField
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
