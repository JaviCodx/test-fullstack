export default function makePatchNews({ editNews }) {
  return async function patchNews(httpRequest) {
    try {
      const news = httpRequest.body
      const toEdit = {
        ...news,
        id: httpRequest.params.id
      }

      const modified = await editNews(toEdit)

      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: { modified }
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 404,
          body: {
            error: e.message
          }
        }
      }
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
