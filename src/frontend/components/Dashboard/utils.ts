export const getRandomIntInclusive = (min: number, max: number) => {
  const minCeil = Math.ceil(min)
  const maxFloor = Math.floor(max)
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil
}

export const randomNumbersWithFixedSum = (quantity: number, sum: number) => {
  const result = []
  let total = 0

  for (let i = 0; i < quantity - 1; i++) {
    const max = sum - total
    const num = getRandomIntInclusive(0, max)
    result.push(num)
    total += num
  }
  result.push(sum - total)

  return result
}
