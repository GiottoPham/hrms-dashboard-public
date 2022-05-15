import {
  fetchCoordinates,
  fetchLocation,
  fetchPlace,
  fetchPredictLocation,
  LatLng,
  LocationMap,
  PredictedLocations,
} from '@frontend/state/coordinates-api'
import {
  LOCATIONS,
  LOCATION_REVERSE,
  PLACE,
  PREDICT_LOCATIONS,
} from '@frontend/state/query-keys'
import { useQuery } from 'react-query'
export const useCoordinate = () => {
  const { data: coordinates, ...rest } = useQuery<LocationMap>({
    queryKey: [LOCATIONS],
    queryFn: () => fetchCoordinates(),
  })

  return { coordinates, ...rest }
}
export const useLocation = (coordinate?: [number, number]) => {
  const { data: locations, ...rest } = useQuery<LocationMap>({
    queryKey: [LOCATION_REVERSE, coordinate],
    queryFn: () => fetchLocation(coordinate),
    enabled: !!coordinate,
  })

  return { locations, ...rest }
}
export const usePredictedLocation = (input?: string) => {
  const { data: predictLocations, ...rest } = useQuery<PredictedLocations>({
    queryKey: [PREDICT_LOCATIONS, input],
    queryFn: () => fetchPredictLocation(input),
    enabled: !!input,
  })

  return { predictLocations, ...rest }
}
export const usePlace = (place_id?: string) => {
  const { data: place, ...rest } = useQuery<LatLng>({
    queryKey: [PLACE, place_id],
    queryFn: () => fetchPlace(place_id),
    enabled: !!place_id,
  })

  return { place, ...rest }
}
