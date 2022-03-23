export const currencyFormatter = (number?: string) => {
  if (!number) return ''
  return parseInt(number).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  })
}
