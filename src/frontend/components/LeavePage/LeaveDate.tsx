import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DesktopDatePicker } from '@mui/lab'
import { InputLabel } from '@mui/material'
import { useLeaveParams } from '@frontend/state/leave-params'
export const LeaveDate = () => {
  const { leaveParams, setLeaveParams } = useLeaveParams()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Select day
      </InputLabel>
      <DesktopDatePicker
        autoFocus={false}
        value={leaveParams.date}
        onChange={(newValue) => {
          if (newValue)
            setLeaveParams((prev) => ({
              ...prev!,
              date: newValue.toISOString(),
            }))
        }}
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
        maxDate={new Date()}
      />
    </LocalizationProvider>
  )
}
