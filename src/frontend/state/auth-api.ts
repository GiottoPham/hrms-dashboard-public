import axios from 'axios'
import type { UserDetail } from '@frontend/types/user'
export const fetchUser = (id: number) => (): Promise<UserDetail> => {
  return axios
    .request({
      method: 'GET',
      url: `/api/v1/account/${id}`,
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
      url: '/api/v1/auth/login',
      data: {
        username,
        password,
      },
    })
    .then((res) => res.data)
}
export const logout = () => {
  return axios
    .request<Auth>({
      method: 'POST',
      url: '/logout',
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
  token: string
  id: number
  // roleid: number
}
