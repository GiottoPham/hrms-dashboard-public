import { Auth, fetchUser } from '@frontend/state/auth-api'
import { AUTH, CURRENT_USER } from '@frontend/state/query-keys'
import axios from 'axios'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

export const useCurrentUser = () => {
  const queryClient = useQueryClient()
  const auth = queryClient.getQueryData<Auth>(AUTH)

  const {
    data: currentUser,
    isLoading: isLoadingUser,
    ...rest
  } = useQuery([CURRENT_USER, auth?.userId], fetchUser(auth?.userId), {
    enabled: true,
  })
  return {
    currentUser,
    isLoading: isLoadingUser,
    ...rest,
  }
}
export const useAuth = () => {
  const queryClient = useQueryClient()
  const auth = queryClient.getQueryData<Auth>(AUTH)

  // const queryFn =
  //   auth?.hasTriedKeepLogin === 'true'
  //     ? () => {
  //         throw new Error('Keep Login fail')
  //       }
  //     : keepLogin

  // const { data, ...rest } = useQuery<Auth>({
  //   queryKey: AUTH,
  //   queryFn,
  //   retry: false,
  //   refetchInterval: 10 * 60 * 1000,
  //   refetchIntervalInBackground: true,
  //   onError: () => {
  //     if (auth?.accessToken) {
  //       location.href = '/'
  //     } else {
  //       queryClient.setQueryData<Auth>(AUTH, { hasTriedKeepLogin: 'true' })
  //     }
  //   },
  // })

  const accessToken = auth?.accessToken

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.Authorization = `Bearer ${accessToken}`
    }
  }, [accessToken])

  return { auth: auth }
}
