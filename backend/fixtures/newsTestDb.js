import { MongoClient, ObjectId } from 'mongodb'

let connection, db

export default async function makeDb() {
  connection =
    connection ||
    (await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true
    }))
  db = db || (await connection.db('test'))
  db.makeIdFromString = makeIdFromString

  return db
}

function makeIdFromString(string) {
  return new ObjectId(string)
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
