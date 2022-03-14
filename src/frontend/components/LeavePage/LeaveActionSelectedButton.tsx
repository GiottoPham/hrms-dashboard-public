import { AcceptSelectedButton } from '@components/LeavePage/AcceptSelectedButton'
import { IgnoreSelectedButton } from '@components/LeavePage/IgnoreSelectedButton'
export const LeaveActionSelectedButton = () => {
  return (
    <div className="flex flex-row justify-end items-end">
      <AcceptSelectedButton />
      <IgnoreSelectedButton />
    </div>
  )
}
