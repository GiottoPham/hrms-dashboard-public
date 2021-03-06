export enum UserStatus {
  Enable = 'enable',
  Disable = 'disable',
}
export type UserInputParams = {
  username: string
  roleid: number
  password: string
  status: UserStatus
  eid: number
}
export type UserDetail = UserInputParams & { id: number }

export type UserDetailParams = {
  pagination?: number // 1 page = 10 item
  sort: {
    sortBy: keyof UserDetail // string
    sortOrder: 'asc' | 'desc'
  }
  available?: boolean
}
