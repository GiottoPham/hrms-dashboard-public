import { SHOW_PAYROLLS } from '@frontend/state/query-keys'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useShowPayroll = () => {
  const queryClient = useQueryClient()

  const { data: showPayroll = false } = useQuery({
    queryKey: SHOW_PAYROLLS,
    queryFn: () => false,
  })

  const setShowPayroll = useCallback(
    (updater: Updater<boolean | undefined, boolean>) => {
      queryClient.setQueryData(SHOW_PAYROLLS, updater)
    },
    [queryClient]
  )

  return {
    showPayroll,
    setShowPayroll,
  }
}
