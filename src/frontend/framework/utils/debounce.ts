import { useEffect, useState } from 'react'

export const useDebounceSearchQuery = <T>(searchQuery: T, delay = 200) => {
  const [debouncedValue, setDebouncedValue] = useState(searchQuery)

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      if (searchQuery) setDebouncedValue(searchQuery)
    }, delay)

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery, delay])

  return debouncedValue
}
