import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import { useDeleteUnit } from '@frontend/state/unit-mutation'
import { Button, CircularProgress } from '@mui/material'
import { useToast } from '@frontend/framework/Toast'

export const DeleteUnitButton = ({
  renderButton,
  id,
  closePopover,
}: {
  renderButton: RenderButtonFn
  id: number
  closePopover: () => void
}) => {
  const { deleteUnit, isLoading } = useDeleteUnit()
  const { openToast } = useToast()

  return (
    <ButtonWithModal
      renderButton={renderButton}
      renderModal={({ Modal, isOpen, closeModal }) => (
        <Modal
          open={isOpen}
          onClose={() => {
            closeModal()
            closePopover()
          }}
          closeAfterTransition
          disableScrollLock
          onBackdropClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-6/12 lg:w-5/12 xl:w-4/12 md:h-1/4 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto items-center justify-center">
            <p>Do you want to delete this sub-unit? It can not reverted</p>
            <div className="mt-5">
              <Button
                classes={{
                  root: 'rounded-full font-nunito normal-case shadow-none w-24 text-primary mr-5',
                }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  closeModal()
                  closePopover()
                }}
              >
                No
              </Button>
              <Button
                classes={{
                  root: 'rounded-full font-nunito normal-case shadow-none w-24 text-white',
                }}
                color="primary"
                variant="contained"
                disabled={isLoading}
                onClick={() =>
                  deleteUnit(id).finally(() => {
                    openToast('Delete sub-unit successful', {
                      variant: 'success',
                      anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                      },
                    })
                    closeModal()
                  })
                }
                startIcon={
                  isLoading && (
                    <CircularProgress color="primary" size={20} thickness={5} />
                  )
                }
                type="submit"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    ></ButtonWithModal>
  )
}
