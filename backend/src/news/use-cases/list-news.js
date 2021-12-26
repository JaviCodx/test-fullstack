export default function makeListNews({ newsDb }) {
  return async function listNews({ archivedOnly, nonArchivedOnly }) {
    return await newsDb.findAll({ archivedOnly, nonArchivedOnly })
  }
}
