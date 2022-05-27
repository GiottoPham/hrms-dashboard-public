export const changeTime = (time?: string) => {
  if (!time) return new Date()
  const day = new Date().toISOString().split('T')[0]
  const newTime = `${day}T${time}.000Z`
  return new Date(newTime)
}
