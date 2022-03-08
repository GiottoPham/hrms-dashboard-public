import { TextInput } from '@frontend/framework/TextInput'
import type { UserInputParams } from '@frontend/types/user'
import { useFormikContext } from 'formik'
export const UserInput = ({
  fieldName,
  label,
  disabled = false,
}: {
  disabled?: boolean
  fieldName: keyof UserInputParams
  label: string
}) => {
  const { values, errors, setFieldValue, touched } =
    useFormikContext<UserInputParams>()
  return (
    <TextInput
      disabled={disabled}
      required
      fullWidth
      id={fieldName}
      label={label}
      name={fieldName}
      placeholder={label}
      value={values[fieldName]}
      error={!!errors[fieldName] && touched[fieldName]}
      onChange={(e) => setFieldValue(fieldName, e.target.value)}
      InputProps={{
        classes: { root: 'h-10 rounded-lg font-nunito bg-white text-sm' },
      }}
    />
  )
}
