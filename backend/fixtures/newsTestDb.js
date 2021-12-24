import { MongoClient } from 'mongodb'

let connection, db

export default async function makeDb() {
  connection =
    connection ||
    (await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true
    }))
  db = db || (await connection.db('test'))

  return db
}
export async function closeDb() {
  await connection.close()
  await db.close()
}

export async function clearDb() {
  await db.collection('news').deleteMany({})
  return true
}

export { connection, db }
