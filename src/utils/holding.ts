import db from '../db'

export const convertedValue = (holding: Holding) => {
  const currency: Currency = db
    .get('currencies')
    .find({ code: holding.currency })
    .value()

  console.log(currency)

  return holding.value / (currency.euro_rate || 1)
}
