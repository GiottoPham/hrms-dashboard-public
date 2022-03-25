import type { AttendanceList } from '@frontend/types/attendance'
import type { AttendanceParams } from '@frontend/types/attendance-params'
import axios from 'axios'

export const fetchAttendances = (
  attendanceParams: AttendanceParams
): Promise<AttendanceList> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/attendances',
      params: {
        departmentId: attendanceParams.departmentId,
        week: attendanceParams.week,
      },
    })
    .then((res) => res.data.attendanceList)
}
