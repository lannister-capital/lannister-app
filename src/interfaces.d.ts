interface Holding {
  id: string
  name: string
  value: number
  hex_color: string
  currency_code: string
  transactions?: Array
  convertedValue?: number
}

interface Currency {
  name: string
  symbol: string
  code: string
  euro_rate: number
}

interface Transaction {
  id: string
  name: string
  value: number
  type: string
  date: string
}
