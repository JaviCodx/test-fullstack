import makeNews from './'
import makeFakeNews from '../../../fixtures/news'

describe('news', () => {
  it('must have an author', () => {
    const news = makeFakeNews({ author: null })

    expect(() => makeNews(news)).toThrow('News must have an author.')
  })

  it('must have a title', () => {
    const news = makeFakeNews({ title: null })

    expect(() => makeNews(news)).toThrow('News must have a title.')
  })

  it('must have a description', () => {
    const news = makeFakeNews({ description: null })

    expect(() => makeNews(news)).toThrow('News must have a description.')
  })

  it('must have a content', () => {
    const news = makeFakeNews({ content: null })

    expect(() => makeNews(news)).toThrow('News must have a content.')
  })
  it('can be marked as archived', () => {
    const notArchived = makeFakeNews()
    const news = makeNews(notArchived)
    expect(news.isArchived()).toBe(false)
    expect(news.getArchivedOn()).toBe(null)

    news.markArchived()
    expect(news.isArchived()).toBe(true)
    expect(news.getArchivedOn()).toBeDefined()
  })
})
