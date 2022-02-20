import { TextInput } from '@frontend/framework/TextInput'
import type { AssignAccountInputParams } from '@frontend/types/employee'
import type { UserInputParams } from '@frontend/types/user'
import { FormikErrors, FormikTouched, useFormikContext } from 'formik'
import { useEffect } from 'react'
export const AccountInput = ({
  fieldName,
  label,
}: {
  fieldName: keyof UserInputParams
  label: string
}) => {
  const { values, errors, setFieldValue, touched, handleBlur } =
    useFormikContext<AssignAccountInputParams>()
  useEffect(() => {
    if (values.newAccount?.[fieldName] === undefined)
      setFieldValue(`newAccount.${fieldName}`, '', false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (values.newAccount?.[fieldName] === undefined) return null
  return (
    <div className="flex flex-col">
      <TextInput
        required
        fullWidth
        id={fieldName}
        label={label}
        name={`newAccount.${fieldName}`}
        placeholder={label}
        value={values.newAccount?.[fieldName]}
        error={
          !!(
            (errors as FormikErrors<AssignAccountInputParams>)
              ?.newAccount as FormikErrors<UserInputParams>
          )?.[fieldName] &&
          (
            (touched as FormikTouched<AssignAccountInputParams>)
              ?.newAccount as FormikTouched<UserInputParams>
          )?.[fieldName]
        }
        onBlur={handleBlur}
        onChange={(e) =>
          setFieldValue(`newAccount.${fieldName}`, e.target.value)
        }
        InputProps={{
          classes: { root: 'h-10 rounded-lg font-nunito bg-white text-sm' },
        }}
      />
      {!!(
        (errors as FormikErrors<AssignAccountInputParams>)
          ?.newAccount as FormikErrors<UserInputParams>
      )?.[fieldName] &&
        (
          (touched as FormikTouched<AssignAccountInputParams>)
            ?.newAccount as FormikTouched<UserInputParams>
        )?.[fieldName] && (
          <p className="text-danger text-sm font-semibold">
            {
              (
                (errors as FormikErrors<AssignAccountInputParams>)
                  ?.newAccount as FormikErrors<UserInputParams>
              )?.[fieldName]
            }
          </p>
        )}
    </div>
  )
}
