import makeEditNews from './edit-news'
import makeNewsDb from '../data-access/news-db'
import makeFakeNews from '../../../fixtures/news'
import makeDb, { clearDb } from '../../../fixtures/newsTestDb'

describe('edit news', () => {
  let newsDb
  beforeAll(() => {
    newsDb = makeNewsDb({ makeDb })
  })
  afterEach(async () => {
    await clearDb()
  })
  it('archives a news', async () => {
    const news = makeFakeNews()
    const editNews = makeEditNews({ newsDb })
    const insertedToEdit = await newsDb.insert(news)

    insertedToEdit.archived = true
    const edited = await editNews(insertedToEdit)
    expect(edited.archived).toBe(true)
    return expect(edited.archivedOn).not.toBe(null)
  })

  it('can modify content of a news', async () => {
    const news = makeFakeNews()
    const editNews = makeEditNews({ newsDb })
    const insertedToEdit = await newsDb.insert(news)

    insertedToEdit.content = 'modified content'
    const edited = await editNews(insertedToEdit)
    expect(edited.content).toBe('modified content')
  })

  it('must include an id', () => {
    const newsToEdit = makeFakeNews({ id: undefined })
    const editNews = makeEditNews({ newsDb })
    expect(editNews(newsToEdit)).rejects.toThrow('You must supply an id.')
  })
})
