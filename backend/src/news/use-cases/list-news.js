export default function makeListNews({ newsDb }) {
  return async function listNews({ archivedOnly }) {
    return await newsDb.findAll({ archivedOnly })
  }
}
