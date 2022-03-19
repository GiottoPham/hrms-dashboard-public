import { JOB_PARAMS } from '@frontend/state/query-keys'
import type { JobDetailParams } from '@frontend/types/job'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useJobParams = () => {
  const queryClient = useQueryClient()

  const { data: jobParams = defaultJobParams } = useQuery<JobDetailParams>({
    queryKey: JOB_PARAMS,
    queryFn: () => defaultJobParams,
  })

  const setJobParams = useCallback(
    (updater: Updater<JobDetailParams | undefined, JobDetailParams>) => {
      queryClient.setQueryData<JobDetailParams>(JOB_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    jobParams,
    setJobParams,
  }
}
export const defaultJobParams: JobDetailParams = {
  sort: {
    sortBy: 'title',
    sortOrder: 'asc',
  },
}
