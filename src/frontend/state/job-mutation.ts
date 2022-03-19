import { createJobRequest, editJobRequest } from '@frontend/state/job-api'
import { JOBS } from '@frontend/state/query-keys'
import type { JobInputParams } from '@frontend/types/job'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateJob = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (jobParams: JobInputParams) => createJobRequest(jobParams),
    onSuccess: () => {
      queryClient.refetchQueries([JOBS])
    },
    retry: false,
  })

  return { createJob: mutateAsync, ...rest }
}
export const useEditJob = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({
      id,
      jobParams,
    }: {
      id: number
      jobParams: JobInputParams
    }) => editJobRequest(id, jobParams),
    onSuccess: () => {
      queryClient.refetchQueries([JOBS])
    },
    retry: false,
  })

  return { editJob: mutateAsync, ...rest }
}
