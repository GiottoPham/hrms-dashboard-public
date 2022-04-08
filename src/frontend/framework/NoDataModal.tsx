import { NoDataIcon } from '@frontend/framework/icons/NoDataIcon'
import cx from 'classnames'
export const NoDataModal = ({ isAttendance }: { isAttendance?: boolean }) => {
  return (
    <div
      className={cx(
        'bg-white h-[300px] w-full flex justify-center items-center flex-col',
        { 'max-w-[1136px]': isAttendance }
      )}
    >
      <NoDataIcon className="w-[200px] h-[200px]" />
      <p className="font-nunito text-primary text-3xl uppercase font-bold">
        No data found
      </p>
    </div>
  )
}
