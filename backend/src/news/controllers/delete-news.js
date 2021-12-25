export default function makeDeleteNews({ removeNews }) {
  return async function deleteNews(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const deleted = await removeNews({ id: httpRequest.params.id })
      return {
        headers,
        statusCode: deleted.deletedCount === 0 ? 404 : 200,
        body: { deleted }
      }
    } catch (e) {
      // TODO: Error logging

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
