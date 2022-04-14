import {
  fetchCities,
  fetchDistricts,
  fetchWards,
} from '@frontend/state/countries-api'
import { CITIES, DISTRICTS, WARDS } from '@frontend/state/query-keys'
import type { City, District, Ward } from '@frontend/types/coutries'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useCities = () => {
  const { data: cities, ...rest } = useQuery<City[], AxiosError>({
    queryKey: [CITIES],
    queryFn: () => fetchCities(),
  })

  return { cities, ...rest }
}
export const useDistricts = (provinceId: number) => {
  const { data, ...rest } = useQuery<District[], AxiosError>({
    queryKey: [DISTRICTS],
    queryFn: () => fetchDistricts(),
  })
  const districts = data?.filter(
    ({ province_code }) => province_code === provinceId
  )
  return { districts, ...rest }
}

export const useWards = (districtId: number) => {
  const { data, ...rest } = useQuery<Ward[], AxiosError>({
    queryKey: [WARDS],
    queryFn: () => fetchWards(),
  })
  const wards = data?.filter(
    ({ district_code }) => district_code === districtId
  )
  return { wards, ...rest }
}
