import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import shortid from 'shortid'

const adapter = new LocalStorage('db')
const db = low(adapter)

// Example default values
db.defaults({
  holdings: [
    {
      id: shortid.generate(),
      name: 'Example',
      value: 20000.0,
      color: '#ffbf00'
    },
    {
      id: shortid.generate(),
      name: 'Outro exemplo',
      value: 50000.0,
      color: '#A52A2A'
    }
  ]
}).write()

// Example write
// db.get('holdings')
//   .push({ title: 'Example' })
//   .write()

// Example read
// db.read('holdings').value()

export default db
