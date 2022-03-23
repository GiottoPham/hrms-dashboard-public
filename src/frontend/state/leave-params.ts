import { CHECKED_LEAVE_DETAIL, LEAVE_PARAMS } from '@frontend/state/query-keys'
import type { CheckedLeaveDetail, LeaveParams } from '@frontend/types/leave'
import { useCallback, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useCheckedLeaveDetail = () => {
  const queryClient = useQueryClient()

  const { data: checkedLeaveDetail = {} } = useQuery<CheckedLeaveDetail>({
    queryKey: CHECKED_LEAVE_DETAIL,
    queryFn: () => ({}),
  })

  const setCheckedLeaveDetail = useMemo(
    () =>
      (
        updater: Updater<CheckedLeaveDetail | undefined, CheckedLeaveDetail>
      ) => {
        queryClient.setQueryData<CheckedLeaveDetail>(
          CHECKED_LEAVE_DETAIL,
          updater
        )
      },
    [queryClient]
  )

  const { leaveParams } = useLeaveParams()

  useEffect(() => {
    setCheckedLeaveDetail({})
  }, [leaveParams, setCheckedLeaveDetail])

  return {
    checkedLeaveIndices: Object.keys(checkedLeaveDetail).map((key) =>
      Number(key)
    ),
    checkedLeaveIds: Object.values(checkedLeaveDetail),
    checkedLeaveDetail,
    setCheckedLeaveDetail,
  }
}

export const useLeaveParams = () => {
  const queryClient = useQueryClient()

  const { data: leaveParams = defaultLeave } = useQuery<LeaveParams>({
    queryKey: LEAVE_PARAMS,
    queryFn: () => defaultLeave,
  })

  const setLeaveParams = useCallback(
    (updater: Updater<LeaveParams | undefined, LeaveParams>) => {
      queryClient.setQueryData(LEAVE_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    leaveParams,
    setLeaveParams,
  }
}
export const defaultLeave: LeaveParams = {
  pagination: 1,
  departmentId: 1,
  applicationDate: new Date().toISOString(),
  sort: {
    sortBy: 'employeeName',
    sortOrder: 'asc',
  },
}
