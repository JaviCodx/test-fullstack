import makeAddNews from './add-news'
import makeNewsDb from '../data-access/news-db'
import makeFakeNews from '../../../fixtures/news'
import makeDb, { clearDb } from '../../../fixtures/newsTestDb'

describe('add news', () => {
  let newsDb
  beforeAll(() => {
    newsDb = makeNewsDb({ makeDb })
  })

  afterAll(async () => {
    await clearDb()
  })
  it('inserts news in the database', async () => {
    const news = makeFakeNews()

    const addNews = makeAddNews({ newsDb })
    const { id, ...inserted } = await addNews(news)

    expect(inserted).toMatchObject(news)
  })
})
