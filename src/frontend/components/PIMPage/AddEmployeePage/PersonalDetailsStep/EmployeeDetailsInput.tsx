import { TextInput } from '@frontend/framework/TextInput'
import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { useFormikContext } from 'formik'
export const EmployeeDetailsInput = ({
  fieldName,
  label,
  disabled = false,
}: {
  fieldName: keyof Pick<
    PersonalDetailInputParams,
    'email' | 'firstName' | 'lastName' | 'phone'
  >
  label: string
  disabled?: boolean
}) => {
  const { values, errors, setFieldValue, touched, handleBlur } =
    useFormikContext<PersonalDetailInputParams>()
  return (
    <>
      <TextInput
        disabled={disabled}
        required
        fullWidth
        id={fieldName}
        type={fieldName}
        label={label}
        name={fieldName}
        onBlur={handleBlur}
        placeholder={label}
        value={values[fieldName]}
        error={!!errors[fieldName] && touched[fieldName]}
        onChange={(e) => setFieldValue(fieldName, e.target.value)}
        InputProps={{
          classes: { root: 'h-10 rounded-lg font-nunito bg-white text-sm' },
        }}
      />
      {!!errors[fieldName] && touched[fieldName] && (
        <p className="text-danger text-sm font-semibold">{errors[fieldName]}</p>
      )}
    </>
  )
}
