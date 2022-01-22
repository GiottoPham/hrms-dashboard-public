import { Auth, login } from '@frontend/state/auth-api'
import { AUTH } from '@frontend/state/query-keys'
import { useMutation, useQueryClient } from 'react-query'

export const useLogin = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: login,
    onSuccess: (auth) => {
      queryClient.setQueryData<Auth>(AUTH, auth)
    },
  })

  return {
    login: mutateAsync,
    ...rest,
  }
}
