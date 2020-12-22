export const isFunction = functionToCheck => {
  return functionToCheck && Object.prototype.toString.call(functionToCheck) === '[object Function]'
}

export const isNumber = number => {
  return (typeof number === 'string' || typeof number === 'number') && !isNaN(number)
}
