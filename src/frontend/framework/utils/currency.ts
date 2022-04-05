export const currencyFormatter = (number?: number) => {
  if (!number) return ''
  return number.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  })
}
