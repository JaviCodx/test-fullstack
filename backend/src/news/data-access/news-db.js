import { ObjectId } from 'mongodb'
export default function makeNewsDb({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    insert,
    remove,
    update
  })
  async function findAll({ archivedOnly = true } = {}) {
    const db = await makeDb()
    const query = {}
    // const query = archivedOnly ? { archived: true } : {}
    const results = await db.collection('news').find(query).toArray()
    return results.map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }

  async function findById({ id: _id } = {}) {
    const db = await makeDb()

    const result = await db
      .collection('news')
      .find({ _id: new ObjectId(_id) })
      .toArray()

    if (result.length === 0) {
      return null
    }
    const { _id: id, ...found } = result[0]
    return { id, ...found }
  }

  async function insert({ ...newsInfo }) {
    const db = await makeDb()

    const result = await db.collection('news').insertOne(newsInfo)

    const { _id: id, ...insertedInfo } = await db
      .collection('news')
      .findOne({ _id: result.insertedId })

    return { id, ...insertedInfo }
  }

  async function update({ id: _id, ...newsInfo }) {
    const db = await makeDb()
    const result = await db
      .collection('news')
      .updateOne({ _id: new ObjectId(_id) }, { $set: { ...newsInfo } })

    return result.modifiedCount > 0 ? { id: _id, ...newsInfo } : null
  }
  async function remove({ id: _id }) {
    const db = await makeDb()

    const result = await db.collection('news').deleteOne({ _id })
    return result.deletedCount
  }
}
