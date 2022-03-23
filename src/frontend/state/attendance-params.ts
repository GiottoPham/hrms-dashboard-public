import { ATTENDANCE_PARAMS } from '@frontend/state/query-keys'
import type { AttendanceParams } from '@frontend/types/attendance-params'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useAttendanceParams = () => {
  const queryClient = useQueryClient()

  const { data: attendanceParams = defaultAttendace } =
    useQuery<AttendanceParams>({
      queryKey: ATTENDANCE_PARAMS,
      queryFn: () => defaultAttendace,
    })

  const setAttendanceParams = useCallback(
    (updater: Updater<AttendanceParams | undefined, AttendanceParams>) => {
      queryClient.setQueryData(ATTENDANCE_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    attendanceParams,
    setAttendanceParams,
  }
}
export const defaultAttendace: AttendanceParams = {
  pagination: 1,
  departmentId: 1,
  week: new Date().toISOString(),
}
