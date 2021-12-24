import makeNews from '../entities'
export default function makeEditNews({ newsDb }) {
  return async function editNews({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }

    const existing = await newsDb.findById({ id })

    if (!existing) {
      throw new Error('News not found.')
    }

    const news = makeNews({ ...existing, ...changes })

    if (news.isArchived()) {
      news.markArchived()
    }

    const updated = await newsDb.update({
      id,
      author: news.getAuthor(),
      createdOn: news.getCreatedOn(),
      title: news.getTitle(),
      description: news.getDescription(),
      content: news.getContent(),
      archivedOn: news.getArchivedOn(),
      archived: news.isArchived()
    })
    return { ...existing, ...updated }
  }
}
