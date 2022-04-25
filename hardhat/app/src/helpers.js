export const colorMapper = {
  transparent: 0,
  red: 1,
  orange: 2,
  yellow: 3,
  green: 4,
  blue: 5,
  indigo: 6,
  violet: 7,
  white: 8,
  grey: 9,
  black: 10
}

export const getHexColor = ['#ddd', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'grey', 'black']

export const formatToShortAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(-4, address.length)}`
}
