import { Parser } from 'json2csv'
import { convertedValue } from './holding'
import { saveAs } from 'file-saver'

export const exportData = data => {
  // Need to make a copy since pass by reference
  let tempData = [...data]
  const fileName = new Date().toISOString().slice(0, 10) + '-data.csv'

  // Current list of fields we want to export
  const fields = [
    'id',
    'name',
    'value',
    'hex_color',
    'currency_code',
    'convertedValue',
    'totalValueInSetCurrency'
  ]

  // Add in the totalValue to make parsing easier in the json. Total value is relative to global currency state.
  let totalValue = {
    totalValueInSetCurrency: 0
  }

  // Sum the converted value
  tempData.forEach(obj => {
    obj['convertedValue'] = convertedValue(obj)
    totalValue['totalValueInSetCurrency'] += obj['convertedValue']
  })
  tempData.push(totalValue)

  // Parse the data
  const parser = new Parser({ fields })
  let csv = parser.parse(tempData)

  // Download it
  var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
  saveAs(blob, fileName);
}
