/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/frontend/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    colors: {
      'primary': '#FFAC2F',
      'primary-100': '#fef6e7',
      'primary-200': '#FCECCE',
      'primary-300': '#FFBE5C',
      'primary-400': '#ffc56d',
      'primary-500': '#FFAC2F',
      'secondary': '#00639B',
      'secondary-100': '#33658A',
      'secondary-200': '#FFE0C9',
      'secondary-300': '#FFC5A1',
      'secondary-400': '#FFA778',
      'secondary-500': '#00639B',
      'secondary-600': '#212936',
      'gray-100': '#F5F5F5',
      'gray-200': '#EEEEEE',
      'gray-300': '#DADADA',
      'gray-400': '#CDCDCD',
      'gray-500': '#999999',
      'gray-700': '#666666',
      'gray-800': '#333333',
      'gray-900': '#161616',
      'blue-100': '#F7FAFC',
      'blue-200': '#F1F5F9',
      'blue-300': '#EDEFF3',
      'blue-400': '#EBEDF2',
      'blue-500': '#AEB6CA',
      'blue-600': '#718096',
      'success': '#42A87A',
      'danger-200': '#FFF5F5',
      'danger-400': '#FF455C',
      'danger-500': '#FF3A3A',
      'danger': '#FF3A3A',
      'warning-200': '#FFF7E7',
      'warning-400': '#FFC452',
      'warning-500': '#E49F18',
      'warning': '#E49F18',
      'info-200': '#E6F7FF',
      'info-300': '#B5DBFF',
      'info-400': '#1890FF',
      'info-500': '#0078E7',
      'info': '#0078E7',
      'yellow-100': '#FFF7E7',
      'white': '#FFFFFF',
      'black': '#161616',
      'transparent': 'transparent',
      'current': 'currentColor',
      'late': '#FFCB76',
      'ontime': '#7ED321',
      'leave': '#666666',
      'pending': '#A859E5',
      'total': '#A86500',
      'success': '#4BB543',
    },
    extend: {
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '1/5': '20%',
        '10/12': '83.3333%',
        '11/12': '91.6667%',
      },
      fontFamily: {
        nunito: ['Nunito'],
      },
      fontSize: {
        '2xs': '0.5rem',
      },
      minWidth: {
        '40': '10rem',
        '44': '11rem',
        'xl': '1280px',
        '1/2': '50%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      transitionProperty: {
        width: 'width',
      },
      width: {
        140: '35rem',
      },
      boxShadow: {
        search:
          '0px -1px 2px rgba(48, 49, 51, 0.08), 0px 8px 16px rgba(48, 49, 51, 0.08)',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
      borderColor: ['last'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
