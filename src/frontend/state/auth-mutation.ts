import { Auth, login, logout } from '@frontend/state/auth-api'
import { AUTH, CURRENT_USER } from '@frontend/state/query-keys'
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
export const useLogout = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(AUTH, undefined)
      queryClient.setQueryData(CURRENT_USER, undefined)
    },
    onError: () => {
      queryClient.setQueryData(AUTH, undefined)
      queryClient.setQueryData(CURRENT_USER, undefined)
    },
  })

  return {
    logout: mutateAsync,
    ...rest,
  }
}
