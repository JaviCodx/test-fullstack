export default function makeGetNews({ listNews }) {
  return async function getNews(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const newsList = await listNews({
        archivedOnly: httpRequest.query.archivedOnly,
        nonArchivedOnly: httpRequest.query.nonArchivedOnly
      })
      return {
        headers,
        statusCode: 200,
        body: newsList
      }
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
