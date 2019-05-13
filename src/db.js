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

export default db
