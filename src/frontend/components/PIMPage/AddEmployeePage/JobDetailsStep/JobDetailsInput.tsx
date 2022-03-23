import { TextInput } from '@frontend/framework/TextInput'
import type { JobDetailInputParams } from '@frontend/types/employee'
import { useFormikContext } from 'formik'
export const JobDetailsInput = ({
  fieldName,
  label,
  disabled = false,
}: {
  fieldName: keyof Pick<JobDetailInputParams, 'pit'>
  label: string
  disabled?: boolean
}) => {
  const { values, errors, setFieldValue, touched, handleBlur } =
    useFormikContext<JobDetailInputParams>()
  return (
    <>
      <TextInput
        disabled={disabled}
        required
        fullWidth
        id={fieldName}
        type={fieldName === 'pit' ? 'number' : fieldName}
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
