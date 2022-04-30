import { AttendanceWeek } from '@components/AttendancePage/AttendanceWeek'
import { UnitSelect } from '@components/AttendancePage/UnitSelect'
import { NoDataModal } from '@frontend/framework/NoDataModal'
import { formatDate } from '@frontend/framework/utils/date'
import { useAttendanceParams } from '@frontend/state/attendance-params'
import { useAttendances } from '@frontend/state/attendance-queries'
import { Avatar, Button } from '@mui/material'
import { Tooltip } from '@mui/material'
import cx from 'classnames'
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
export const AttendanceTable = () => {
  const getRandomColor = () =>
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()
  const { attendanceParams, setAttendanceParams } = useAttendanceParams()
  const { attendances: attendanceList, isLoading } =
    useAttendances(attendanceParams)
  const attendances = attendanceList?.attendanceList || []
  const start = startOfWeek(new Date(), { weekStartsOn: 1 })
  const end = endOfWeek(new Date(), { weekStartsOn: 1 })
  const dateArray = eachDayOfInterval({ start: start, end: end })
  const listDate =
    attendances && attendances.length > 0
      ? attendances[0].checkins.map((attendance) => attendance.date)
      : dateArray.slice(0, 6).map((d) => d.toISOString())
  const splitSecond = (time: string) => {
    const timeArr = time.split(':')
    return `${timeArr[0]}:${timeArr[1]}`
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mb-5 flex self-start space-x-10 ml-36 w-1/2">
        <div className="w-1/3">
          <AttendanceWeek />
        </div>
        <div className="w-1/3">
          <UnitSelect />
        </div>
      </div>
      <div className="flex flex-row flex-wrap rounded-t-lg overflow-hidden border border-primary">
        <div className="w-44 h-12 bg-secondary-600 text-primary flex items-center  justify-center font-nunito text-sm font-bold">
          Employee
        </div>
        {listDate.map((date, index) => (
          <div
            className="w-40 h-12 bg-secondary-600 text-primary flex items-center border-l justify-center font-nunito border-l-primary text-sm font-bold"
            key={index}
          >
            <p>
              {formatDate(date, 'EEEE')} ({formatDate(date, 'MM/dd')})
            </p>
          </div>
        ))}
      </div>
      {!isLoading && attendances.length === 0 && <NoDataModal isAttendance />}
      {attendances.map((attendance, index) => (
        <div
          key={index}
          className={cx(
            'flex flex-row flex-wrap overflow-hidden border-r border-l border-b border-primary',
            {
              'rounded-b-lg': index === attendances.length - 1,
            }
          )}
        >
          <Tooltip
            title={
              <div className="flex flex-col">
                <p>{attendance.name}</p>
                <div className="w-full border-b my-1"></div>
                <p>{attendance.departmentName}</p>
                <p>{attendance.jobTitle}</p>
              </div>
            }
            classes={{
              tooltip: 'font-inter font-semibold px-3 py-1 bg-white text-black',
            }}
            placement="left"
          >
            <div className="w-44 h-16 bg-white flex items-center justify-start font-nunito px-2">
              <Avatar
                classes={{ root: 'h-8 w-8 text-2xl mr-2' }}
                style={{ backgroundColor: getRandomColor() }}
              >
                <p className="text-lg text-white font-nunito font-semibold">
                  {attendance.name[0]}
                </p>
              </Avatar>
              <p>{attendance.name}</p>
            </div>
          </Tooltip>
          {attendance.checkins.map((checkin, index) => {
            return (
              <div
                className="w-40 h-16 bg-white flex items-center border-l justify-center font-nunito border-l-primary p-2"
                key={index}
              >
                <div
                  className={cx(
                    'items-center justify-center flex flex-col  w-full h-full border-2 rounded-lg',
                    {
                      'bg-ontime/[0.1] border-ontime': checkin.status === 0,
                      'bg-late/[0.1] border-late': checkin.status === 1,
                      'bg-leave/[0.1] border-leave': checkin.status === 2,
                    }
                  )}
                >
                  <p className="text-black text-sm">Ca hành chính</p>
                  <p className="text-black text-sm">
                    {checkin.time_in ? splitSecond(checkin.time_in) : '-:- '} -{' '}
                    {checkin.time_out ? splitSecond(checkin.time_out) : ' -:-'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      ))}
      <div className="flex self-end mr-36 mt-5">
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary hover:bg-gray-100',
            disabled: 'bg-gray-200',
          }}
          color="inherit"
          variant="outlined"
          disabled={attendanceList?.first}
          onClick={() =>
            setAttendanceParams((prev) => ({
              ...prev!,
              pagination: attendanceParams.pagination - 1,
            }))
          }
        >
          <ChevronLeftIcon className="w-7 h-7 text-primary" />
        </Button>
        <Button
          classes={{
            root: 'min-w-0 w-10 h-10 bg-white border border-primary ml-5 hover:bg-gray-100',
            disabled: 'bg-gray-200',
          }}
          variant="outlined"
          disabled={attendanceList?.last}
          onClick={() =>
            setAttendanceParams((prev) => ({
              ...prev!,
              pagination: attendanceParams.pagination + 1,
            }))
          }
        >
          <ChevronRightIcon className="w-7 h-7 text-primary" />
        </Button>
      </div>
    </div>
  )
}
