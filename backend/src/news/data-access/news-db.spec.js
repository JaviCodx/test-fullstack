import makeDb, { clearDb } from '../../../fixtures/newsTestDb'
import makeNewsDb from './news-db'
import makeFakeNews from '../../../fixtures/news'

describe('news db', () => {
  let newsDb

  beforeEach(async () => {
    newsDb = makeNewsDb({ makeDb })
  })

  afterEach(async () => {
    await clearDb()
  })

  it('lists news', async () => {
    const inserts = await Promise.all(
      [makeFakeNews(), makeFakeNews(), makeFakeNews()].map(newsDb.insert)
    )

    const found = await newsDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach((insert) => expect(found).toContainEqual(insert))
  })

  it('finds a news by id', async () => {
    const news = makeFakeNews()
    const inserted = await newsDb.insert(news)
    const { id, ...found } = await newsDb.findById(inserted)
    expect(found).toEqual(news)
  })

  it('inserts a news', async () => {
    const news = makeFakeNews()

    const { id, ...result } = await newsDb.insert(news)

    return expect(result).toEqual(news)
  })

  it('deletes news', async () => {
    const news = makeFakeNews()
    const insertedNews = await newsDb.insert(news)
    const deletedCount = await newsDb.remove(insertedNews)
    expect(deletedCount).toBe(1)
    const found = await newsDb.findAll()
    return expect(found.length).toBe(0)
  })
  it('update news', async () => {
    const news = makeFakeNews()
    const insertedNews = await newsDb.insert(news)
    insertedNews.content = 'test text'
    const updatedNews = await newsDb.update(insertedNews)
    return expect(updatedNews.content).toBe('test text')
  })
})
