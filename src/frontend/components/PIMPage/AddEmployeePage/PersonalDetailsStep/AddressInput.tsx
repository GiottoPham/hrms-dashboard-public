import { TextInput } from '@frontend/framework/TextInput'
import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { useFormikContext } from 'formik'
export const AddressInput = ({
  permanent = true,
  label,
  disabled = false,
}: {
  label: string
  permanent?: boolean
  disabled?: boolean
}) => {
  const {
    values: { permanentAddress, temporaryAddress },
    errors: {
      permanentAddress: permanentError,
      temporaryAddress: temporaryError,
    },
    setFieldValue,
    touched: {
      permanentAddress: permanentTouched,
      temporaryAddress: temporaryTouched,
    },
    handleBlur,
  } = useFormikContext<PersonalDetailInputParams>()
  return (
    <>
      <TextInput
        disabled={disabled}
        id={permanent ? 'permanentAddress.address' : 'temporaryAddress.address'}
        required
        fullWidth
        label={label}
        name={
          permanent ? 'permanentAddress.address' : 'temporaryAddress.address'
        }
        placeholder={label}
        value={permanent ? permanentAddress.address : temporaryAddress.address}
        error={
          !!(permanent ? permanentError?.address : temporaryError?.address) &&
          (permanent ? permanentTouched?.address : temporaryTouched?.address)
        }
        onChange={(e) =>
          permanent
            ? setFieldValue('permanentAddress', {
                ...permanentAddress,
                address: e.target.value,
              })
            : setFieldValue('temporaryAddress', {
                ...temporaryAddress,
                address: e.target.value,
              })
        }
        InputProps={{
          classes: { root: 'h-10 rounded-lg font-nunito bg-white text-sm' },
        }}
        onBlur={handleBlur}
      />
      {permanent && !!permanentError?.address && permanentTouched?.address && (
        <p className="text-danger text-sm font-semibold">
          {permanentError.address}
        </p>
      )}
      {!permanent && !!temporaryError?.address && temporaryTouched?.address && (
        <p className="text-danger text-sm font-semibold">
          {temporaryError.address}
        </p>
      )}
    </>
  )
}
