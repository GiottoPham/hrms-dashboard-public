import '@styles/tailwind.css'
import '@styles/shared.css'
import '@styles/react-phone-number-input.css'

import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate } from 'react-query/hydration'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from '@frontend/framework/ThemeProvider'
import axios from 'axios'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={3000}
        >
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </SnackbarProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
