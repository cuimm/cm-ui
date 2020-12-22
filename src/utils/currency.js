export const currencyFormatter = function(amount, fractionSize = 2, symbol = '¥') {
  if (!(typeof amount === 'string' || typeof amount === 'number') || isNaN(amount)) {
    return '-'
  }
  const iAmount = parseFloat(amount)

  if (!isFinite(iAmount) || (!iAmount && iAmount !== 0)) {
    return '-'
  }

  const digitsRE = /(\d{3})(?=\d)/g
  const step = 3
  const str = Math.abs(iAmount).toFixed(fractionSize)
  const integerPart = str.split('.')[0]
  const _float = str.split('.')[1] ? `.${str.split('.')[1]}` : ''

  const count = integerPart.length % step
  const stepPart = integerPart.length > step ? ',' : ''
  const head = count > 0 ? integerPart.slice(0, count) + stepPart : ''
  const sign = iAmount < 0 ? '-' : ''
  return (sign + symbol + head + integerPart.slice(count).replace(digitsRE, '$1,') + _float)
}
