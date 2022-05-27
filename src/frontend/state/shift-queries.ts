import { SHIFTS } from '@frontend/state/query-keys'
import { fetchShifts } from '@frontend/state/shift-api'
import type { Shift } from '@frontend/types/shift'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const useShifts = () => {
  const { data: shifts, ...rest } = useQuery<Shift[], AxiosError>({
    queryKey: [SHIFTS],
    queryFn: () => fetchShifts(),
    retry: false,
  })

  return { shifts, ...rest }
}
