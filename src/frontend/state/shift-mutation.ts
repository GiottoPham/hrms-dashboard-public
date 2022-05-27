import { SHIFTS } from '@frontend/state/query-keys'
import { createShiftRequest, editShiftRequest } from '@frontend/state/shift-api'
import type { ShiftDetailInput } from '@frontend/types/shift'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateShift = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (shift: ShiftDetailInput) => createShiftRequest(shift),
    onSuccess: () => {
      queryClient.refetchQueries([SHIFTS])
    },
    retry: false,
  })

  return { createShift: mutateAsync, ...rest }
}
export const useEditShift = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({ id, shift }: { id: number; shift: ShiftDetailInput }) =>
      editShiftRequest(id, shift),
    onSuccess: () => {
      queryClient.refetchQueries([SHIFTS])
    },
    retry: false,
  })

  return { editShift: mutateAsync, ...rest }
}
