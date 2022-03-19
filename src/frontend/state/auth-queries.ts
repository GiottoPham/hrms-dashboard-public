import { Auth, fetchUser } from '@frontend/state/auth-api'
import { AUTH, CURRENT_USER } from '@frontend/state/query-keys'
import axios from 'axios'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

export const useCurrentUser = () => {
  const { auth } = useAuth()

  const {
    data: currentUser,
    isLoading: isLoadingUser,
    ...rest
  } = useQuery([CURRENT_USER, auth?.token], fetchUser(auth?.id as number), {
    enabled: true,
    retry: false,
  })
  return {
    currentUser: currentUser,
    isLoadingUser,
    ...rest,
  }
}
export const useAuth = () => {
  const queryClient = useQueryClient()
  const auth = queryClient.getQueryData<Auth>(AUTH)
  const ISSERVER = typeof window === 'undefined'
  if (!auth && !ISSERVER) {
    const token = localStorage.getItem('token')
    const isTokenExpired = (token: string) =>
      Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000
    if (token && !isTokenExpired(token))
      queryClient.setQueryData<Auth>([AUTH], {
        token: token,
        id: parseInt(localStorage.getItem('id') as string),
      })
  }

  const accessToken = auth?.token

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.Authorization = `Bearer ${accessToken}`
      axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
    }
  }, [accessToken])

  return { auth: auth }
}
