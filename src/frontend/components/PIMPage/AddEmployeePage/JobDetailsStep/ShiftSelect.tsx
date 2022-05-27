import { formatDate } from '@frontend/framework/utils/date'
import { changeTime } from '@frontend/framework/utils/time'
import { useShifts } from '@frontend/state/shift-queries'
import type { JobDetailInputParams } from '@frontend/types/employee'
import { Autocomplete, InputLabel, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

export const ShiftSelect = ({ disabled = false }: { disabled?: boolean }) => {
  const { shifts } = useShifts()
  const { values, setFieldValue, handleBlur, errors, touched } =
    useFormikContext<JobDetailInputParams>()
  if (!shifts) return null
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Shift
      </InputLabel>
      <Autocomplete
        disabled={disabled}
        options={shifts}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <p className="text-sm">
                {option.name} {formatDate(changeTime(option.timeIn), 'HH:mm')} -{' '}
                {formatDate(changeTime(option.timeOut), 'HH:mm')}
              </p>
            </li>
          )
        }}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) =>
          `${option.name} ${formatDate(
            changeTime(option.timeIn),
            'HH:mm'
          )} - ${formatDate(changeTime(option.timeOut), 'HH:mm')}`
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name="shiftId"
            onBlur={handleBlur}
            error={!!errors.jobId && touched.jobId}
            InputProps={{
              classes: {
                root: 'h-10 rounded-lg font-nunito bg-white text-sm pt-1',
              },
              ...params.InputProps,
            }}
          />
        )}
        value={shifts.find((shift) => shift.id === values?.shiftId)}
        onChange={(_, newValue) => setFieldValue('shiftId', newValue?.id)}
      />
      {!!errors.shiftId && touched.shiftId && (
        <p className="text-danger text-sm font-semibold">{errors.shiftId}</p>
      )}
    </>
  )
}
