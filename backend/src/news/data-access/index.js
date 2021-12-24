import makeNewsDb from './news-db'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'
const dbName = 'news'
const client = new MongoClient(url, { useNewUrlParser: true })

export async function makeDb() {
  await client.connect()

  return client.db(dbName)
}

const newsDb = makeNewsDb({ makeDb })
export default newsDb
