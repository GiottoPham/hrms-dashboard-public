import * as React from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import PickersDay, { PickersDayProps } from '@mui/lab/PickersDay'
import endOfWeek from 'date-fns/endOfWeek'
import isSameDay from 'date-fns/isSameDay'
import isWithinInterval from 'date-fns/isWithinInterval'
import startOfWeek from 'date-fns/startOfWeek'
import { DesktopDatePicker } from '@mui/lab'
import { InputLabel } from '@mui/material'
import { useAttendanceParams } from '@frontend/state/attendance-params'
export const AttendanceWeek = () => {
  const { attendanceParams, setAttendanceParams } = useAttendanceParams()
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    if (!attendanceParams.week) {
      return <PickersDay {...pickersDayProps} />
    }

    const start = startOfWeek(new Date(attendanceParams.week))
    const end = endOfWeek(new Date(attendanceParams.week))

    const dayIsBetween = isWithinInterval(date, { start, end })
    const isFirstDay = isSameDay(date, start)
    const isLastDay = isSameDay(date, end)

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    )
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Select week
      </InputLabel>
      <DesktopDatePicker
        inputFormat="'Week of' MMM d"
        autoFocus={false}
        value={attendanceParams.week}
        onChange={(newValue) => {
          if (newValue)
            setAttendanceParams((prev) => ({
              ...prev!,
              week: newValue.toISOString(),
            }))
        }}
        maxDate={new Date()}
        renderDay={renderWeekPickerDay}
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

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean
  isFirstDay: boolean
  isLastDay: boolean
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    'borderRadius': 0,
    'backgroundColor': theme.palette.primary.main,
    'color': theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>
