import makePatchNews from './put-news'
import makeFakeNews from '../../../fixtures/news'

describe('put news controller', () => {
  it('successfully modifies a news', async () => {
    const fakeNews = makeFakeNews()
    const patchNews = makePatchNews({ editNews: (c) => c })
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        id: 1234
      },
      body: fakeNews
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 201,
      body: { modified: { id: 1234, ...request.body } }
    }
    const actual = await patchNews(request)
    expect(actual).toEqual(expected)
  })
})
