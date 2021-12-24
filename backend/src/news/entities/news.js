export default function buildMakeNews() {
  return function makeNews({
    title,
    description,
    content,
    author,
    archivedOn,
    archived,
    createdOn = Date.now()
  } = {}) {
    if (!author) {
      throw new Error('News must have an author.')
    }

    if (!title) {
      throw new Error('News must have a title.')
    }

    if (!description) {
      throw new Error('News must have a description.')
    }

    if (!content) {
      throw new Error('News must have a content.')
    }

    return Object.freeze({
      getAuthor: () => author,
      getCreatedOn: () => createdOn,
      getContent: () => content,
      getArchivedOn: () => archivedOn,
      getDescription: () => description,
      getTitle: () => title,
      isArchived: () => archived,
      markArchived: () => {
        archivedOn = Date.now()
        archived = true
      }
    })
  }
}
