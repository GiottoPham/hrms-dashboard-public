import type { ReactNode } from 'react'

import { Fragment, useState } from 'react'
import { Drawer } from '@mui/material'

export const ButtonWithDrawer = ({
  renderButton,
  renderDrawer,
}: ButtonWithDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <Fragment>
      {renderButton({ isDrawerOpen, openDrawer, closeDrawer })}
      {renderDrawer({ Drawer, isDrawerOpen, openDrawer, closeDrawer })}
    </Fragment>
  )
}

export type ButtonWithDrawerProps = {
  renderButton: RenderButtonFn
  renderDrawer: RenderDrawerFn
}

export type RenderButtonFn = (inputs: DrawerState) => ReactNode
export type RenderDrawerFn = (
  inputs: DrawerState & { Drawer: typeof Drawer }
) => ReactNode

type DrawerState = {
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}
