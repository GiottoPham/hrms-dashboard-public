export enum UserStatus {
  Enable = 'enable',
  Disable = 'disable',
}
export type UserInputParams = {
  username: string
  roleId: number
  password: string
  userStatus: UserStatus
}
export type UserDetail = UserInputParams & { id: number }
