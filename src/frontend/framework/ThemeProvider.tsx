import type { ReactNode } from 'react'

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: 'Averta',
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#FFAC2F',
    },
    secondary: {
      main: '#06004A',
    },
    success: {
      main: '#42A87A',
    },
    warning: {
      main: '#E49F18',
    },
    error: {
      main: '#FF3A3A',
    },
    info: {
      main: '#1890FF',
    },
    text: {
      primary: '#161616',
      secondary: '#666666',
      disabled: '#999999',
    },
  },
})

type MuiThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: MuiThemeProviderProps) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
