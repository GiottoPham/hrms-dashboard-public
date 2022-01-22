import type { CurrentUser } from '@frontend/types/auth'
import axios from 'axios'

export const fetchUser = (id?: string) => (): Promise<CurrentUser> => {
  return axios
    .request({
      method: 'GET',
      url: `/user/${id}`,
    })
    .then((res) => res.data)
}
export const login = ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  return axios
    .request<Auth>({
      method: 'POST',
      url: '/login',
      data: {
        username,
        password,
      },
    })
    .then((res) => res.data)
}
// export const keepLogin = (): Promise<Auth> => {
//   return axios
//     .request<Auth>({
//       method: 'POST',
//       url: '/api/keep_login',
//     })
//     .then(transformAuthResponse)
// }
// const transformAuthResponse = (res: AxiosResponse<Auth>) => {
//   return {
//     accessToken: res.data.accessToken,
//     tokenExpiresAt: res.data.tokenExpiresAt,
//     createdByAdmin: res.data.createdByAdmin,
//     resetPasswordUrl: res.data.resetPasswordUrl,
//   }
// }

export type Auth = {
  userId?: string
  accessToken?: string
}
