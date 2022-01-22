import '@styles/tailwind.css'
import '@styles/shared.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@frontend/framework/ThemeProvider'
import axios from 'axios'

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
