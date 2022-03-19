import { fetchAttendances } from '@frontend/state/attendance-api'
import { ATTENDANCES } from '@frontend/state/query-keys'
import type { AttendanceList } from '@frontend/types/attendance'
import type { AttendanceParams } from '@frontend/types/attendance-params'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useAttendances = (attendanceParams: AttendanceParams) => {
  const { data: attendances, ...rest } = useQuery<AttendanceList, AxiosError>({
    queryKey: [ATTENDANCES, attendanceParams],
    queryFn: () => fetchAttendances(attendanceParams),
    retry: false,
  })

  return { attendances, ...rest }
}
