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
  const { data: districts, ...rest } = useQuery<District[], AxiosError>({
    queryKey: [DISTRICTS, provinceId],
    queryFn: () => fetchDistricts(provinceId),
  })

  return { districts, ...rest }
}

export const useWards = (districtId: number) => {
  const { data: wards, ...rest } = useQuery<Ward[], AxiosError>({
    queryKey: [WARDS, districtId],
    queryFn: () => fetchWards(districtId),
  })

  return { wards, ...rest }
}
