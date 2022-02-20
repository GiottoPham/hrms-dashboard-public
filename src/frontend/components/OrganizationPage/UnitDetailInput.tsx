import { useFormikContext } from 'formik'
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material'
import type { UnitInputParams } from '@frontend/types/unit'

export const UnitDetailInput = ({
  fieldName,
  label,
  disabled = false,
  ...rest
}: {
  fieldName: keyof UnitInputParams
  label: string
} & TextareaAutosizeProps) => {
  const { getFieldProps } = useFormikContext<UnitInputParams>()
  const getFieldPropsName = getFieldProps(fieldName)
  return (
    <div>
      <span className="text-sm font-nunito font-bold text-black pl-[1px] mb-1">
        {label}
      </span>
      <TextareaAutosize
        className="w-full border border-gray-400 p-2 rounded-lg text-sm font-light"
        disabled={disabled}
        {...rest}
        {...getFieldPropsName}
      />
    </div>
  )
}
