import { useFormikContext } from 'formik'
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material'
import type { UnitInputParams } from '@frontend/types/unit'
import cx from 'classnames'
export const UnitDetailInput = ({
  fieldName,
  label,
  disabled = false,
  ...rest
}: {
  fieldName: keyof UnitInputParams
  label: string
} & TextareaAutosizeProps) => {
  const { getFieldProps, errors, touched } = useFormikContext<UnitInputParams>()
  const getFieldPropsName = getFieldProps(fieldName)
  return (
    <div>
      <span className="text-sm font-nunito font-bold text-black pl-[1px] mb-1">
        {label}
      </span>
      <TextareaAutosize
        className={cx('w-full border p-2 rounded-lg text-sm', {
          'border-danger': !!errors[fieldName] && touched[fieldName],
          'border-gray-400': !errors[fieldName],
          'text-gray-500': disabled,
        })}
        disabled={disabled}
        {...rest}
        {...getFieldPropsName}
      />
    </div>
  )
}
