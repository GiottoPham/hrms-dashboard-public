import { useFormikContext } from 'formik'
import { TextareaAutosize } from '@mui/material'
import type { UnitInputParams } from '@frontend/types/unit'

export const UnitDetailInput = ({
  fieldName,
  label,
  minRow,
  maxRow,
  disabled = false,
}: {
  fieldName: keyof UnitInputParams
  label: string
  props?: string
  minRow: number
  maxRow: number
  disabled?: boolean
}) => {
  const { getFieldProps } = useFormikContext<UnitInputParams>()
  const getFieldPropsName = getFieldProps(fieldName)
  return (
    <div>
      <span className="text-sm font-nunito font-bold text-black pl-[1px] mb-1">
        {label}
      </span>
      <TextareaAutosize
        className="w-full border border-gray-400 p-2 rounded-lg text-sm font-light"
        minRows={minRow}
        maxRows={maxRow}
        {...getFieldPropsName}
        disabled={disabled}
      />
    </div>
  )
}
