import { useWards } from '@frontend/state/countries-queries'
import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useFormikContext } from 'formik'

export const WardSelect = ({
  label,
  permanent = true,
  districtId,
  disabled,
}: {
  label: string
  permanent?: boolean
  districtId?: number
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
  const { wards } = useWards(districtId || 0)
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        {label}
      </InputLabel>
      <Select
        disabled={disabled || !wards}
        displayEmpty
        error={
          permanent
            ? !!permanentError?.wardId && permanentTouched?.wardId
            : !!temporaryError?.wardId && temporaryTouched?.wardId
        }
        name={permanent ? `permanentAddress.wardId` : `temporaryAddress.wardId`}
        onBlur={handleBlur}
        fullWidth
        value={
          permanent
            ? permanentAddress?.wardId || ''
            : temporaryAddress?.wardId || ''
        }
        onChange={(e) =>
          permanent
            ? setFieldValue('permanentAddress', {
                ...permanentAddress,
                wardId: e.target.value,
              })
            : setFieldValue('temporaryAddress', {
                ...temporaryAddress,
                wardId: e.target.value,
              })
        }
        componentsProps={{
          root: {
            className: 'font-nunito text-sm rounded-lg h-10 ',
          },
          input: {
            className: 'w-full py-1.5',
          },
        }}
      >
        {!districtId && (
          <MenuItem className="font-nunito text-sm" value="" disabled>
            Select a district first
          </MenuItem>
        )}
        {wards?.map(({ ward_id, ward_name }) => (
          <MenuItem
            key={ward_id}
            value={ward_id}
            className="font-nunito text-sm"
          >
            {ward_name}
          </MenuItem>
        ))}
      </Select>

      {districtId &&
        permanent &&
        !!permanentError?.wardId &&
        permanentTouched?.wardId && (
          <p className="text-danger text-sm font-semibold">
            Please select one of the options
          </p>
        )}
      {districtId &&
        !permanent &&
        !!temporaryError?.wardId &&
        temporaryTouched?.wardId && (
          <p className="text-danger text-sm font-semibold">
            Please select one of the options
          </p>
        )}
    </>
  )
}
