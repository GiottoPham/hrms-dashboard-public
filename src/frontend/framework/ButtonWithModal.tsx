import type { ReactNode } from 'react'

import { Fragment, useState } from 'react'
import { Modal } from '@mui/material'

export const ButtonWithModal = ({
  renderButton,
  renderModal,
}: ButtonWithModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Fragment>
      {renderButton({ isOpen, openModal, closeModal })}
      {renderModal({ Modal, isOpen, openModal, closeModal })}
    </Fragment>
  )
}

export type ButtonWithModalProps = {
  renderButton: RenderButtonFn
  renderModal: RenderModalFn
}

export type RenderButtonFn = (inputs: ModalState) => ReactNode
export type RenderModalFn = (
  inputs: ModalState & { Modal: typeof Modal }
) => ReactNode

type ModalState = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}
