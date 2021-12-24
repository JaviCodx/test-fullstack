export default function makeRemoveNews({ newsDb }) {
  return async function removeNews({ id } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }

    const newsToDelete = await newsDb.findById({ id })

    if (!newsToDelete) {
      return deleteNothing()
    }

    await newsDb.remove(newsToDelete)
    return {
      deletedCount: 1,
      message: 'News deleted.'
    }

    function deleteNothing() {
      return {
        deletedCount: 0,
        message: 'News not found, nothing to delete.'
      }
    }
  }
}
