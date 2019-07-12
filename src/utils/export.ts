import { Parser } from 'json2csv'
import { convertedValue } from './holding'

export const exportData = (data) => {
    // Need to make a copy since pass by reference
    let tempData = [...data]
    const fileName = new Date().toISOString().slice(0, 10) + '-data'

    // Current list of fields we want to export
    const fields = ['id', 'name', 'value', 'color', 
                    'currency', 'convertedValue', 'totalValueInSetCurrency']

    // Add in the totalValue to make parsing easier in the json. Total value is relative to global currency state.
    let totalValue = {
        'totalValueInSetCurrency' : 0
    }

    // Sum the converted value
    tempData.forEach((obj) => {
        obj['convertedValue'] = convertedValue(obj)
        totalValue['totalValueInSetCurrency'] += obj['convertedValue']

    })
    tempData.push(totalValue)

    // Parse the data
    const parser = new Parser({ fields })
    let csv = parser.parse(tempData)

    // Allow it to be downloadable
    let link = document.createElement('a')
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
}
