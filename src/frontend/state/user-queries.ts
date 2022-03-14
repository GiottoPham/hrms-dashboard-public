import { USERS } from '@frontend/state/query-keys'
import { fetchUsers } from '@frontend/state/user-api'
import type { UserDetail, UserDetailParams } from '@frontend/types/user'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useUsers = (userParams: UserDetailParams) => {
  const { data: users, ...rest } = useQuery<UserDetail[], AxiosError>({
    queryKey: [USERS, userParams],
    queryFn: () => fetchUsers(userParams),
    retry: false,
  })

  return { users, ...rest }
}
