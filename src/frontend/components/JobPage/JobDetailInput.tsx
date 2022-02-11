import type { JobInputParams } from '@frontend/types/job'
import { useFormikContext } from 'formik'
import { TextareaAutosize } from '@mui/material'

export const JobDetailInput = ({
  fieldName,
  label,
  minRow,
  maxRow,
}: {
  fieldName: keyof JobInputParams
  label: string
  props?: string
  minRow: number
  maxRow: number
}) => {
  const { getFieldProps } = useFormikContext<JobInputParams>()
  const getFieldPropsName = getFieldProps(fieldName)
  return (
    <div>
      <span className="text-sm font-nunito font-bold text-black pl-[1px] mb-1">
        {label}
      </span>
      <TextareaAutosize
        className="w-full border border-gray-400 p-2 rounded-lg"
        minRows={minRow}
        maxRows={maxRow}
        placeholder={label}
        {...getFieldPropsName}
      />
    </div>
  )
}
