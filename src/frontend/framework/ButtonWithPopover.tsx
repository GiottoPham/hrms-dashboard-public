import type { MouseEvent, ReactNode } from 'react'

import { Fragment, useState } from 'react'
import { Popover } from '@mui/material'

export const ButtonWithPopover = ({
  renderButton,
  renderPopover,
}: ButtonWithPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>()

  const openPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const closePopover = () => {
    setAnchorEl(undefined)
  }

  const isPopoverOpen = Boolean(anchorEl)

  return (
    <Fragment>
      {renderButton({ isPopoverOpen, openPopover, closePopover })}
      {renderPopover({
        anchorEl,
        isPopoverOpen,
        Popover,
        openPopover,
        closePopover,
      })}
    </Fragment>
  )
}

type ButtonWithPopoverProps = {
  renderButton: RenderButtonFn
  renderPopover: RenderPopoverFn
}

type RenderButtonFn = (inputs: PopoverState) => ReactNode
type RenderPopoverFn = (
  inputs: PopoverState & {
    Popover: typeof Popover
    anchorEl: HTMLButtonElement | undefined
  }
) => ReactNode

type PopoverState = {
  isPopoverOpen: boolean
  openPopover: (e: MouseEvent<HTMLButtonElement>) => void
  closePopover: () => void
}
