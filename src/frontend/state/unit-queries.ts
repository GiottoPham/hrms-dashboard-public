import { UNITS } from '@frontend/state/query-keys'
import { fetchUnits } from '@frontend/state/unit-api'
import type { Unit } from '@frontend/types/unit'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useUnits = (nested?: boolean) => {
  const { data: units, ...rest } = useQuery<Unit[], AxiosError>({
    queryKey: [UNITS, nested],
    queryFn: () => fetchUnits(nested),
    retry: false,
  })

  return { units, ...rest }
}
