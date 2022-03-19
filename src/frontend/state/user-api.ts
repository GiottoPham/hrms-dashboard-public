import type {
  UserDetail,
  UserDetailParams,
  UserInputParams,
} from '@frontend/types/user'
import axios from 'axios'

export const fetchUsers = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userParams: UserDetailParams
): Promise<UserDetail[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/accounts',
    })
    .then((res) => res.data)
}
export const createUserRequest = (
  userParams: UserInputParams
): Promise<void> => {
  return axios
    .request({
      method: 'PUT',
      url: `/api/v1/account/4`,
      data: {
        username: userParams.username,
        password: userParams.password,
        status: 'enable',
      },
    })
    .then((res) => res.data)
}
export const editUserRequest = (
  id: number,
  userParams: UserInputParams
): Promise<void> => {
  return axios
    .request({
      method: 'PUT',
      url: `/api/v1/accounts/${id}`,
      data: {
        ...userParams,
        status: userParams.accountStatus,
      },
    })
    .then((res) => res.data)
}
