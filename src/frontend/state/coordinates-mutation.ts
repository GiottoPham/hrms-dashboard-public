import { LocationMap, updateCoordinates } from '@frontend/state/coordinates-api'
import { LOCATIONS } from '@frontend/state/query-keys'
import { useMutation, useQueryClient } from 'react-query'

export const useUpdateCoordinate = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (coordinates: LocationMap) => updateCoordinates(coordinates),
    onSuccess: () => {
      queryClient.refetchQueries([LOCATIONS])
    },
    retry: false,
  })

  return { updateCoordinate: mutateAsync, ...rest }
}
