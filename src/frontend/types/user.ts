export enum UserStatus {
  Enable = 'enable',
  Disable = 'disable',
}
export type UserInputParams = {
  name: string
  username: string
  role: string
  password: string
  userStatus: UserStatus
}
