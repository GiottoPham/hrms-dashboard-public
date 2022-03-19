import { USER_PARAMS } from '@frontend/state/query-keys'
import type { UserDetailParams } from '@frontend/types/user'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useUserParams = () => {
  const queryClient = useQueryClient()

  const { data: userParams = defaultUserParams } = useQuery<UserDetailParams>({
    queryKey: USER_PARAMS,
    queryFn: () => defaultUserParams,
  })

  const setUserParams = useCallback(
    (updater: Updater<UserDetailParams | undefined, UserDetailParams>) => {
      queryClient.setQueryData<UserDetailParams>(USER_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    userParams,
    setUserParams,
  }
}
export const defaultUserParams: UserDetailParams = {
  sort: {
    sortBy: 'id',
    sortOrder: 'asc',
  },
}
