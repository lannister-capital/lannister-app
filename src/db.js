import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import shortid from 'shortid'
import currencies from './data/currencies'

const adapter = new LocalStorage('db')
const db = low(adapter)

// Example default values
db.defaults({
  holdings: [
    {
      id: shortid.generate(),
      name: 'Example',
      value: 20000.0,
      color: '#ffbf00',
      currency_code: 'EUR'
    },
    {
      id: shortid.generate(),
      name: 'Bank account',
      value: 50000.0,
      color: '#A52A2A',
      currency_code: 'EUR'
    }
  ],
  currencies,
  db_version: '0.1'
}).write()

// Example write
// db.get('holdings')
//   .push({ title: 'Example' })
//   .write()

// Example read
// db.read('holdings').value()

export default db
