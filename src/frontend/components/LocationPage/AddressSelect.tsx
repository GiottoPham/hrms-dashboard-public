import { useEffect, useState } from 'react'
import { Autocomplete } from '@mui/material'
import { TextInput } from '@frontend/framework/TextInput'
import { usePredictedLocation } from '@frontend/state/coordinate-queries'
import type { PredictedLocation } from '@frontend/state/coordinates-api'
export const AddressSelect = ({
  address,
  setAddress,
}: {
  address?: PredictedLocation
  setAddress: (address?: PredictedLocation) => void
}) => {
  const [keyword, setKeyword] = useState<string>('')
  const { predictLocations = [], isLoading } = usePredictedLocation(keyword)
  useEffect(() => {
    setKeyword('')
  }, [])
  return (
    <Autocomplete
      isOptionEqualToValue={(option, val) => option.place_id === val.place_id}
      getOptionLabel={(option) => option.description as string}
      options={predictLocations}
      loading={isLoading}
      renderInput={(params) => (
        <TextInput
          {...params}
          label="Find Address"
          onChange={(e) => setKeyword(e.target.value || '')}
          debounceable
          placeholder="Find your address"
        />
      )}
      value={address}
      onChange={(_, newValue) => {
        setAddress(newValue ? newValue : undefined)
      }}
      classes={{
        inputRoot: 'h-10 py-0 text-sm bg-white rounded-lg',
        listbox: 'text-sm',
        loading: 'text-sm',
        noOptions: 'text-sm',
        paper: 'rounded-lg',
      }}
    />
  )
}
