import { db } from '@frontend/firebaseConfig'
import axios from 'axios'
import { getDoc, doc, updateDoc } from 'firebase/firestore/lite'

const nbn = doc(db, 'NBN/coordinate')
export const fetchCoordinates = (): Promise<LocationMap> => {
  return getDoc(nbn).then((list) => {
    return list.data() as LocationMap
  })
}
export const updateCoordinates = (coordinate: LocationMap): Promise<void> => {
  return updateDoc(nbn, coordinate)
}
export const fetchLocation = (
  coordinate?: [number, number]
): Promise<LocationMap> => {
  const [latitude, longitude] = coordinate || []
  return axios
    .request({
      method: 'GET',
      baseURL:
        'https://arcane-taiga-55468.herokuapp.com/https://rsapi.goong.io',
      url: '/Geocode',
      params: {
        api_key: 'gy4V1QgKPYdFoxTIKGqWKg1p9JzTqBCqpQJmaDgS',
        latlng: `${latitude}, ${longitude}`,
      },
    })
    .then((res) => {
      const dataRes = res.data.results[0]
      const addressList = dataRes.address_components as AddressComponent
      const loc = {
        city: addressList[addressList.length - 1].long_name,
        district: addressList[addressList.length - 2].long_name,
        ward: addressList[addressList.length - 3].long_name,
        address: addressList
          .slice(0, addressList.length - 3)
          .map((l) => l.long_name)
          .join(', '),
        label: dataRes.formatted_address,
        latitude: dataRes.geometry.location.lat,
        longitude: dataRes.geometry.location.lng,
      }
      return loc
    })
}

export const fetchPredictLocation = (
  input?: string
): Promise<PredictedLocations> => {
  return axios
    .request({
      method: 'GET',
      baseURL:
        'https://arcane-taiga-55468.herokuapp.com/https://rsapi.goong.io',
      url: '/Place/AutoComplete',
      params: {
        input,
        api_key: 'gy4V1QgKPYdFoxTIKGqWKg1p9JzTqBCqpQJmaDgS',
      },
    })
    .then((res) => res.data.predictions)
}
export const fetchPlace = (place_id?: string): Promise<LatLng> => {
  return axios
    .request({
      method: 'GET',
      baseURL:
        'https://arcane-taiga-55468.herokuapp.com/https://rsapi.goong.io',
      url: '/Place/Detail',
      params: {
        place_id,
        api_key: 'gy4V1QgKPYdFoxTIKGqWKg1p9JzTqBCqpQJmaDgS',
      },
    })
    .then((res) => res.data.result.geometry.location)
}
export type AddressComponent = {
  long_name: string
}[]
export type LocationMap = {
  latitude: number
  longitude: number
  address: string
  city: string
  district: string
  ward: string
  label: string
}
export type PredictedLocations = PredictedLocation[]
export type PredictedLocation = {
  place_id: string
  description: string
}
export type LatLng = {
  lat: number
  lng: number
}
