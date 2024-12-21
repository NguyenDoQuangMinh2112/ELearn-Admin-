export const formatPrice = (number: number) => Number(number?.toFixed(1)).toLocaleString()
export const checkLengthDescription = (str: string, number: number) => {
  if (str?.length > 50) {
    return `${str.slice(0, number)}...`
  } else {
    return str
  }
}
