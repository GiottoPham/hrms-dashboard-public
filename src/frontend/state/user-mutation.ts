import { USERS } from '@frontend/state/query-keys'
import { createUserRequest, editUserRequest } from '@frontend/state/user-api'
import type { UserInputParams } from '@frontend/types/user'
import { useMutation, useQueryClient } from 'react-query'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (userParams: UserInputParams) => createUserRequest(userParams),
    onSuccess: () => {
      queryClient.refetchQueries([USERS])
    },
    retry: false,
  })

  return { createUser: mutateAsync, ...rest }
}
export const useEditUser = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: ({
      id,
      userParams,
    }: {
      id: number
      userParams: UserInputParams
    }) => editUserRequest(id, userParams),
    onSuccess: () => {
      queryClient.refetchQueries([USERS])
    },
    retry: false,
  })

  return { editUser: mutateAsync, ...rest }
}
