import { useDistricts } from '@frontend/state/countries-queries'
import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useFormikContext } from 'formik'

export const DistrictSelect = ({
  label,
  permanent = true,
  cityId,
  disabled = false,
}: {
  label: string
  permanent?: boolean
  cityId?: number
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
  const { districts } = useDistricts(cityId || 0)
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        {label}
      </InputLabel>
      <Select
        disabled={disabled}
        displayEmpty
        error={
          permanent
            ? !!permanentError?.districtId && permanentTouched?.districtId
            : !!temporaryError?.districtId && temporaryTouched?.districtId
        }
        name={
          permanent
            ? `permanentAddress.districtId`
            : `temporaryAddress.districtId`
        }
        onBlur={handleBlur}
        fullWidth
        value={
          permanent
            ? permanentAddress?.districtId || ''
            : temporaryAddress?.districtId || ''
        }
        onChange={(e) =>
          permanent
            ? setFieldValue('permanentAddress', {
                ...permanentAddress,
                districtId: e.target.value,
              })
            : setFieldValue('temporaryAddress', {
                ...temporaryAddress,
                districtId: e.target.value,
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
        {!cityId && (
          <MenuItem className="font-nunito text-sm" value="" disabled>
            Select a city first
          </MenuItem>
        )}
        {districts?.map(({ district_id, district_name }) => (
          <MenuItem
            key={district_id}
            value={district_id}
            className="font-nunito text-sm"
          >
            {district_name}
          </MenuItem>
        ))}
      </Select>

      {cityId &&
        permanent &&
        !!permanentError?.districtId &&
        permanentTouched?.districtId && (
          <p className="text-danger text-sm font-semibold">
            Please select one of the options
          </p>
        )}
      {cityId &&
        !permanent &&
        !!temporaryError?.districtId &&
        temporaryTouched?.districtId && (
          <p className="text-danger text-sm font-semibold">
            Please select one of the options
          </p>
        )}
    </>
  )
}
