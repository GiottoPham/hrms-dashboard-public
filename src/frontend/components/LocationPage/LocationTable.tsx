import { Button, CircularProgress } from '@mui/material'
import { Map, Marker } from 'pigeon-maps'
import {
  useCoordinate,
  useLocation,
  usePlace,
} from '@frontend/state/coordinate-queries'
import { useUpdateCoordinate } from '@frontend/state/coordinates-mutation'
import { useEffect, useState } from 'react'
import cx from 'classnames'
import { AddressSelect } from '@components/LocationPage/AddressSelect'
import type { PredictedLocation } from '@frontend/state/coordinates-api'
import LocationOnIcon from '@mui/icons-material/LocationOn'
export const LocationTable = () => {
  const [newAddress, setNewAddress] = useState<PredictedLocation>()
  const { coordinates } = useCoordinate()
  const { updateCoordinate } = useUpdateCoordinate()
  const { place, isLoading: placeLoading } = usePlace(newAddress?.place_id)
  const [loc, setLoc] = useState<[number, number] | undefined>()
  const { locations, isLoading: loadingLocationReverse } = useLocation(loc)
  const { latitude: la, longitude: lo } = coordinates || {}
  useEffect(() => {
    if (locations && loc) updateCoordinate(locations)
  }, [locations, updateCoordinate, loc])
  if (!coordinates) return null
  return (
    <div className="px-10 py-5">
      <div></div>
      <div className="flex flex-col">
        <div className="flex flex-col mb-2">
          <p className="font-nunito text-sm font-bold mb-1">Current Location</p>
          <div className="flex">
            <div className="bg-white p-2 rounded-lg border border-primary flex items-center">
              <LocationOnIcon className="text-primary mr-2" />
              <p className="font-nunito font-bold line-clamp-2">
                {coordinates.label}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-end space-x-5">
          <div className="w-1/2">
            <AddressSelect address={newAddress} setAddress={setNewAddress} />
          </div>
          <Button
            classes={{
              root: 'rounded font-nunito normal-case shadow-none text-white h-10',
            }}
            disabled={!place}
            color="primary"
            variant="contained"
            onClick={() => {
              if (place) setLoc([place.lat, place.lng])
            }}
          >
            {placeLoading && (
              <CircularProgress
                size={18}
                thickness={6}
                color="inherit"
                className="mr-2"
              />
            )}
            Set New Address
          </Button>
        </div>
      </div>
      <div className="border-2 border-primary rounded-lg overflow-hidden relative mt-3">
        {loadingLocationReverse && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <CircularProgress size={40} thickness={6} color="primary" />
          </div>
        )}
        <div className={cx({ 'opacity-50': loadingLocationReverse })}>
          <Map
            height={400}
            defaultCenter={[la || 0, lo || 0]}
            defaultZoom={15}
            onClick={(e) => {
              setLoc(e.latLng)
            }}
          >
            <Marker width={50} anchor={[la || 0, lo || 0]} color="#FFAC2F" />
          </Map>
        </div>
      </div>
    </div>
  )
}
