import { Parser } from 'json2csv'

export const exportData = (data) => {
    const fileName = new Date().toISOString().slice(0, 10) + '-data'

    // Current list of fields we want to export
    const fields = ['id', 'name', 'value', 'color', 
                    'currency', 'convertedValue', 'totalValueInSetCurrency']

    // Add in the totalValue to make parsing easier in the json. Total value is relative to global currency state.
    let totalValue = {
        'totalValueInSetCurrency' : 0
    }

    // Sum the converted value
    data.forEach((obj) => {
        totalValue['totalValueInSetCurrency'] += obj['convertedValue']

    })
    data.push(totalValue)

    // Parse the data
    const parser = new Parser({ fields })
    let csv = parser.parse(data)

    // Allow it to be downloadable
    let link = document.createElement('a')
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
}
