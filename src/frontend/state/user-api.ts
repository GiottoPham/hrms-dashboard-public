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
      params: {
        avaiable: userParams.available,
      },
    })
    .then((res) => res.data)
}
export const createUserRequest = (
  userParams: UserInputParams
): Promise<void> => {
  return axios
    .request({
      method: 'POST',
      url: `/api/v1/account`,
      data: { ...userParams, status: userParams.status.toUpperCase() },
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
      url: `/api/v1/account/${id}`,
      data: { ...userParams, status: userParams.status.toUpperCase() },
    })
    .then((res) => res.data)
}
