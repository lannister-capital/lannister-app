import db from '../db'

export const convertedValue = (holding: Holding) => {
  const currency: Currency = db
    .get('currencies')
    .find({ code: holding.currency })
    .value()

  return holding.value / (currency.euro_rate || 1)
}
