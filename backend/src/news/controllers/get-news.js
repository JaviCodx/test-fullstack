export default function makeGetNews({ listNews }) {
  return async function getNews(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const newsList = await listNews({
        postId: httpRequest.query.postId
      })
      return {
        headers,
        statusCode: 200,
        body: newsList
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)
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
