export const isFunction = functionToCheck => {
  return functionToCheck && Object.prototype.toString.call(functionToCheck) === '[object Function]'
}
