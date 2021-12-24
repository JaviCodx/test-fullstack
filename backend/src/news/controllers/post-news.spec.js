import makePostNews from './post-news'
import makeFakeNews from '../../../fixtures/news'

describe('post news controller', () => {
  it('successfully posts a news', async () => {
    const postNews = makePostNews({ addNews: (c) => c })
    const news = makeFakeNews()
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: news
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 201,
      body: { posted: request.body }
    }

    const actual = await postNews(request)

    expect(actual).toEqual(expected)
  })
})
