import db from '../db'

export const convertedValue = (holding: Holding) => {
  const currency: Currency = db
    .get('currencies')
    .find({ code: holding.currency_code })
    .value()

  if (!currency) return 0

  // TODO: do not retrieve this everytime but allow immediate updates
  const currentGlobalCurrencyCode =
    localStorage.getItem('globalCurrencyCode') || 'EUR'
  const globalCurrency: Currency = db
    .get('currencies')
    .find({ code: currentGlobalCurrencyCode })
    .value()

  let euro_rate = 1
  if (currency && currency.euro_rate) {
    euro_rate = currency.euro_rate
  }
  const euroValue: number = holding.value / euro_rate
  const globalCurrencyValue: number =
    euroValue * (globalCurrency.euro_rate || 1)

  return Math.round(globalCurrencyValue)
}
