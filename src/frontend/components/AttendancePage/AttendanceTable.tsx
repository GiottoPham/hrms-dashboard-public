import { AttendanceWeek } from '@components/AttendancePage/AttendanceWeek'
import { UnitSelect } from '@components/AttendancePage/UnitSelect'
import { formatDate } from '@frontend/framework/utils/date'
import { useAttendanceParams } from '@frontend/state/attendance-params'
import { useAttendances } from '@frontend/state/attendance-queries'
import type { AttendanceList } from '@frontend/types/attendance'
import { Avatar } from '@mui/material'
import { Tooltip } from '@mui/material'
import cx from 'classnames'
export const AttendanceTable = () => {
  const getRandomColor = () => 'hsl(' + Math.random() * 360 + ', 100%, 75%)'
  // const attendanceList: AttendanceList = [
  //   {
  //     name: 'Gia Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Backend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Khang Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Frontend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Khang Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Frontend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Khang Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Frontend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Khang Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Frontend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Khang Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Frontend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Khang Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Frontend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Khang Nguyen',
  //     unitName: 'Team dev',
  //     jobTitle: 'Frontend Engineer',
  //     listCheckin: [
  //       {
  //         timeIn: '2022-02-28T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 0,
  //         date: '2022-02-28T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-01T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-01T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-02T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-03T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: '2022-03-04T02:09:45.788Z',
  //         timeOut: '2022-03-28T10:09:45.788Z',
  //         status: 1,
  //         date: '2022-03-04T02:09:45.788Z',
  //       },
  //       {
  //         timeIn: null,
  //         timeOut: null,
  //         status: 2,
  //         date: '2022-03-05T02:09:45.788Z',
  //       },
  //     ],
  //   },
  // ]
  const { attendanceParams } = useAttendanceParams()
  const { attendances = [] } = useAttendances(attendanceParams)
  if (attendances.length === 0) return null
  const listDate =
    attendances.length > 0
      ? attendances[0].listCheckin.map((attendance) => attendance.date)
      : []
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
                <p>{attendance.unitName}</p>
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
                <p className="text-lg text-black font-nunito font-semibold">
                  {attendance.name[0]}
                </p>
              </Avatar>
              <p>{attendance.name}</p>
            </div>
          </Tooltip>
          {attendance.listCheckin.map((checkin, index) => (
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
                  {formatDate(checkin.timeIn, 'HH:mm') || '-:- '} -{' '}
                  {formatDate(checkin.timeOut, 'HH:mm') || ' -:-'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
