import {
  CHART_PARAMS_HOUR,
  CHART_PARAMS_NUMBER,
} from '@frontend/state/query-keys'
import type { ChartParams } from '@frontend/types/chart'
import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'

export const useChatParamsHour = () => {
  const queryClient = useQueryClient()

  const { data: chartParamsHour = defaultChart } = useQuery<ChartParams>({
    queryKey: CHART_PARAMS_HOUR,
    queryFn: () => defaultChart,
  })

  const setChatParamsHour = useCallback(
    (updater: Updater<ChartParams | undefined, ChartParams>) => {
      queryClient.setQueryData(CHART_PARAMS_HOUR, updater)
    },
    [queryClient]
  )

  return {
    chartParamsHour,
    setChatParamsHour,
  }
}
export const useChatParamsNumber = () => {
  const queryClient = useQueryClient()

  const { data: chartParamsNumber = defaultChart } = useQuery<ChartParams>({
    queryKey: CHART_PARAMS_NUMBER,
    queryFn: () => defaultChart,
  })

  const setChatParamsNumber = useCallback(
    (updater: Updater<ChartParams | undefined, ChartParams>) => {
      queryClient.setQueryData(CHART_PARAMS_NUMBER, updater)
    },
    [queryClient]
  )

  return {
    chartParamsNumber,
    setChatParamsNumber,
  }
}
export const defaultChart: ChartParams = {
  week: new Date().toISOString(),
}
