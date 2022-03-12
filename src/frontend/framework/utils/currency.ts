export const currencyFormatter = (number: string) =>
  parseInt(number).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  })
