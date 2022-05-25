import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'
import QRCode from 'react-qr-code'
import { MD5 } from 'crypto-js'
export const EmployeeQR = ({
  renderButton,
  id,
}: {
  id?: number
  renderButton: RenderButtonFn
}) => {
  const now = new Date()
  return (
    <ButtonWithModal
      renderButton={renderButton}
      renderModal={({ Modal, isOpen, closeModal }) => {
        return (
          <Modal
            open={isOpen}
            onClose={() => {
              closeModal()
            }}
            closeAfterTransition
            disableScrollLock
            onBackdropClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex flex-col font-nunito bg-white h-full w-full px-8 py-6 md:w-8/12 lg:w-1/3 md:h-1/2 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl md:overflow-y-auto">
              <div className="font-bold text-2xl text-center">
                QR CODE OF EMPLOYEE {id}
              </div>
              <div className="flex justify-center mt-5">
                <QRCode
                  value={MD5(
                    `NBNHR ${now.getDate()} ${now.getMonth()} ${now.getFullYear()} ${id}`
                  ).toString()}
                />
              </div>
            </div>
          </Modal>
        )
      }}
    ></ButtonWithModal>
  )
}
