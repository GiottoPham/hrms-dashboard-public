import { TextInputNumber } from '@frontend/framework/TextInputNumber'
import type { JobDetailInputParams } from '@frontend/types/employee'
import { InputLabel } from '@mui/material'
import { useFormikContext } from 'formik'
import type { ChangeEvent } from 'react'
import NumberFormat from 'react-number-format'
export const NumberDetailInput = ({
  fieldName,
  disabled = false,
}: {
  fieldName: keyof Pick<JobDetailInputParams, 'pit' | 'salary'>
  disabled?: boolean
}) => {
  const { errors, setFieldValue, touched, handleBlur, values } =
    useFormikContext<JobDetailInputParams>()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        Salary
      </InputLabel>
      <NumberFormat
        disabled={disabled}
        id="number-format"
        value={values[fieldName]}
        thousandSeparator
        isNumericString
        suffix=" VND"
        customInput={TextInputNumber}
        error={!!errors[fieldName] && touched[fieldName]}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          setFieldValue(
            fieldName,
            Number(e.target.value.replaceAll(',', '').replace(' VND', ''))
          )
        }
        onBlur={handleBlur}
      />
      {!!errors[fieldName] && touched[fieldName] && (
        <p className="text-danger text-sm font-semibold">{errors[fieldName]}</p>
      )}
    </>
  )
}
