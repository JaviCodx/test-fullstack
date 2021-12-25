import makeRemoveNews from './remove-news'
import makeNewsDb from '../data-access/news-db'
import makeFakeNews from '../../../fixtures/news'
import makeDb, { clearDb } from '../../../fixtures/newsTestDb'

describe('remove news', () => {
  let newsDb
  beforeAll(() => {
    newsDb = makeNewsDb({ makeDb })
  })

  afterEach(async () => {
    await clearDb()
  })

  it('handles non existent news', async () => {
    const removeNews = makeRemoveNews({
      newsDb
    })

    const fakeNews = makeFakeNews({ id: '61c6010766a03313e2dc024d' })

    const result = await removeNews(fakeNews)

    return expect(result).toEqual({
      deletedCount: 0,
      message: 'News not found, nothing to delete.'
    })
  })

  it('must include an id', () => {
    const fakeNews = makeFakeNews({ id: undefined })
    const removeNews = makeRemoveNews({
      newsDb
    })

    expect(removeNews(fakeNews)).rejects.toThrow('You must supply an id.')
  })

  it('deletes a news', async () => {
    const fakeNews = makeFakeNews()
    const insertedToDelete = await newsDb.insert(fakeNews)
    const removeNews = makeRemoveNews({
      newsDb
    })

    const result = await removeNews(insertedToDelete)
    return expect(result).toEqual({
      deletedCount: 1,
      message: 'News deleted.'
    })
  })
})
