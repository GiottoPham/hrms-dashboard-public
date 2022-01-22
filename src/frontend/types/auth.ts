export type Auth = {
  accessToken?: string
}

export type CurrentUser = {
  user: {
    id: number
    username: string
    name: string
    email: string
    fullName: string
  }
}
