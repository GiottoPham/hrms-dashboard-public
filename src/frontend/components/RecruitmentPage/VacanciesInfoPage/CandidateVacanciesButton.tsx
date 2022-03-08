import { CandidatesTable } from '@components/RecruitmentPage/CandidatePage/CandidatesTable'
import {
  ButtonWithModal,
  RenderButtonFn,
} from '@frontend/framework/ButtonWithModal'

export const CandidateVacanciesButton = ({
  id,
  renderButton,
}: {
  id: number
  renderButton: RenderButtonFn
}) => {
  return (
    <ButtonWithModal
      renderButton={renderButton}
      renderModal={({ Modal, isOpen, closeModal }) => (
        <Modal
          open={isOpen}
          onClose={closeModal}
          closeAfterTransition
          disableScrollLock
          onBackdropClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="flex h-[400px] w-2/3 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-lg overflow-y-auto">
            <CandidatesTable vacanciesId={id} />
          </div>
        </Modal>
      )}
    ></ButtonWithModal>
  )
}
