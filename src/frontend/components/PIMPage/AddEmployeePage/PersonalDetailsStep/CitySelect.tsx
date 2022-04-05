import { useCities } from '@frontend/state/countries-queries'
import type { PersonalDetailInputParams } from '@frontend/types/employee'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { useFormikContext } from 'formik'

export const CitySelect = ({
  label,
  permanent = true,
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
  const { cities } = useCities()
  return (
    <>
      <InputLabel className="text-sm font-nunito font-bold text-black mb-1">
        {label}
      </InputLabel>
      <Select
        disabled={disabled || !cities}
        name={permanent ? `permanentAddress.cityId` : `temporaryAddress.cityId`}
        error={
          permanent
            ? !!permanentError?.cityId && permanentTouched?.cityId
            : !!temporaryError?.cityId && temporaryTouched?.cityId
        }
        onBlur={handleBlur}
        fullWidth
        value={permanent ? permanentAddress?.cityId : temporaryAddress?.cityId}
        onChange={(e) =>
          permanent
            ? setFieldValue('permanentAddress', {
                ...permanentAddress,
                cityId: e.target.value,
              })
            : setFieldValue('temporaryAddress', {
                ...temporaryAddress,
                cityId: e.target.value,
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
        {cities?.map(({ province_id, province_name }) => (
          <MenuItem
            key={province_id}
            value={province_id}
            className="font-nunito text-sm"
          >
            {province_name}
          </MenuItem>
        ))}
      </Select>
      {permanent && !!permanentError?.cityId && permanentTouched?.cityId && (
        <p className="text-danger text-sm font-semibold">
          Please select one of the options
        </p>
      )}
      {!permanent && !!temporaryError?.cityId && temporaryTouched?.cityId && (
        <p className="text-danger text-sm font-semibold">
          Please select one of the options
        </p>
      )}
    </>
  )
}
