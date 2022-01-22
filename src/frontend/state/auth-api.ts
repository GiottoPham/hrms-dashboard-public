import type { CurrentUser } from '@frontend/types/auth'
import axios from 'axios'

export const fetchUser = (accessToken?: string): Promise<CurrentUser> => {
  return axios
    .request({
      method: 'GET',
      url: '/users',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
}
