import type { ReactNode } from 'react'

import { useCurrentUser } from '@state/auth-queries'
import { Fragment } from 'react'

import { LoginPage } from '@frontend/LoginPage'
import { LogoIcon } from '@frontend/framework/icons/LogoIcon'

type AuthGuardProps = {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { currentUser, isFetching } = useCurrentUser()

  if (isFetching) {
    return (
      <div className="min-h-screen w-full bg-primary-100 relative flex justify-center items-center">
        <LogoIcon className="w-50 h-50" />
      </div>
    )
  }

  if (!currentUser?.user) {
    return <LoginPage />
  }

  return <Fragment>{children}</Fragment>
}
