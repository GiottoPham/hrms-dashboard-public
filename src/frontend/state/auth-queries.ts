import { fetchUser } from '@frontend/state/auth-api'
import { CURRENT_USER } from '@frontend/state/query-keys'
import { useQuery } from 'react-query'

export const useCurrentUser = () => {
  // const { auth, isFetched: isAuthFetched } = useAuth()

  const {
    data: currentUser,
    isLoading: isLoadingUser,
    ...rest
  } = useQuery({
    queryKey: [CURRENT_USER],
    queryFn: () => fetchUser(),
    enabled: true,
  })
  return {
    currentUser,
    isLoading: isLoadingUser,
    ...rest,
  }
}
