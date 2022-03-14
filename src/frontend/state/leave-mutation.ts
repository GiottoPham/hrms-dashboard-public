import { updateLeaveStatusRequest } from '@frontend/state/leave-api'
import { LEAVES } from '@frontend/state/query-keys'
import { useMutation, useQueryClient } from 'react-query'
export const useUpdateLeaveStatus = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({ listIds, status }: { listIds: number[]; status: number }) =>
      updateLeaveStatusRequest(listIds, status),
    onSuccess: () => {
      queryClient.refetchQueries([LEAVES])
    },
    retry: false,
  })

  return { updateLeaveStatus: mutateAsync, ...rest }
}
