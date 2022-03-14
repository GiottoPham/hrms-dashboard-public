import type {
  UserDetail,
  UserDetailParams,
  UserInputParams,
} from '@frontend/types/user'
import axios from 'axios'

export const fetchUsers = (
  userParams: UserDetailParams
): Promise<UserDetail[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/users',
      params: userParams,
    })
    .then((res) => res.data)
}
export const createUserRequest = (
  userParams: UserInputParams
): Promise<void> => {
  return axios
    .request({
      method: 'POST',
      url: `/api/users`,
      data: userParams,
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
      url: `/api/users/${id}`,
      data: userParams,
    })
    .then((res) => res.data)
}
