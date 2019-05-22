import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

db.defaults({ holdings: [] }).write()

// Example write
// db.get('holdings')
//   .push({ title: 'Example' })
//   .write()

// Example read
// db.read('holdings').value()

// Example default values
db.set('holdings', []).write()
db.get('holdings')
  .push({ name: 'Example', amount: 20000.0, color: '#ffbf00' })
  .push({ name: 'Outro exemplo', amount: 50000.0, color: '#A52A2A' })
  .write()

export default db
