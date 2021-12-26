export default function makePostNews({ addNews }) {
  return async function postNews(httpRequest) {
    try {
      const news = httpRequest.body

      const posted = await addNews({
        ...news
      })
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: { posted }
      }
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
