import makeNewsDb from './news-db'
import { MongoClient, ObjectId } from 'mongodb'

const url = process.env.MONGO_URI || 'mongodb://localhost:27017'
const dbName = process.env.NODE_ENV === 'test' ? 'newsTest' : 'news'
const client = new MongoClient(url, { useNewUrlParser: true })

let db
export async function makeDb() {
  try {
    await client.connect()
    db = client.db(dbName)
    db.makeIdFromString = makeIdFromString
    return db
  } catch (error) {
    console.error(error)
  }
}

function makeIdFromString(string) {
  return new ObjectId(string)
}

const newsDb = makeNewsDb({ makeDb })
export default newsDb
export { db }
