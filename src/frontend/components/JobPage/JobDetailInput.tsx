import type { JobInputParams } from '@frontend/types/job'
import { useFormikContext } from 'formik'
import { TextareaAutosize } from '@mui/material'
import cx from 'classnames'
export const JobDetailInput = ({
  fieldName,
  label,
  minRow,
  maxRow,
  disabled = false,
}: {
  fieldName: keyof JobInputParams
  label: string
  props?: string
  minRow: number
  maxRow: number
  disabled?: boolean
}) => {
  const { getFieldProps } = useFormikContext<JobInputParams>()
  const getFieldPropsName = getFieldProps(fieldName)
  return (
    <div>
      <span className="text-sm font-nunito font-bold text-black pl-[1px] mb-1">
        {label}
      </span>
      <TextareaAutosize
        disabled={disabled}
        className={cx('w-full border border-gray-400 p-2 rounded-lg', {
          'text-gray-400': disabled,
        })}
        minRows={minRow}
        maxRows={maxRow}
        {...getFieldPropsName}
      />
    </div>
  )
}
