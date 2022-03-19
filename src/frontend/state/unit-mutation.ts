import { UNITS } from '@frontend/state/query-keys'
import {
  createUnitRequest,
  deleteUnitRequest,
  editUnitRequest,
} from '@frontend/state/unit-api'
import type { UnitInputParams } from '@frontend/types/unit'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateUnit = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (unitParams: UnitInputParams) => createUnitRequest(unitParams),
    onSuccess: () => {
      queryClient.refetchQueries([UNITS])
    },
    retry: false,
  })

  return { createUnit: mutateAsync, ...rest }
}
export const useEditUnit = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({
      id,
      unitParams,
    }: {
      id: number
      unitParams: UnitInputParams
    }) => editUnitRequest(id, unitParams),
    onSuccess: () => {
      queryClient.refetchQueries([UNITS])
    },
    retry: false,
  })

  return { editUnit: mutateAsync, ...rest }
}
export const useDeleteUnit = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (id: number) => deleteUnitRequest(id),
    onSuccess: () => {
      queryClient.refetchQueries([UNITS])
    },
    retry: false,
  })

  return { deleteUnit: mutateAsync, ...rest }
}
