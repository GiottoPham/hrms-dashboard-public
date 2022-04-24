import { fetchLeaves } from '@frontend/state/leave-api'
import { LEAVES } from '@frontend/state/query-keys'
import type { LeaveDetails, LeaveParams } from '@frontend/types/leave'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useLeaves = (leaveParams: LeaveParams) => {
  const { data: leaves, ...rest } = useQuery<LeaveDetails, AxiosError>({
    queryKey: [LEAVES, leaveParams],
    queryFn: () => fetchLeaves(leaveParams),
    retry: false,
  })

  return { leaves, ...rest }
}
