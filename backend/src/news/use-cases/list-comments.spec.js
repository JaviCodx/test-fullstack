import makeListNews from './list-news'
import makeNewsDb from '../data-access/news-db'
import makeFakeNews from '../../../fixtures/news'
import makeDb, { clearDb } from '../../../fixtures/newsTestDb'

describe('get news', () => {
  let newsDb
  beforeAll(() => {
    newsDb = makeNewsDb({ makeDb })
  })
  afterEach(async () => {
    await clearDb()
  })

  it('gets all news', async () => {
    const inserts = await Promise.all(
      [makeFakeNews(), makeFakeNews(), makeFakeNews()].map(newsDb.insert)
    )

    const getNews = makeListNews({ newsDb })
    const newsList = await getNews({})
    expect.assertions(inserts.length)
    return inserts.forEach((insert) => expect(newsList).toContainEqual(insert))
  })
})
