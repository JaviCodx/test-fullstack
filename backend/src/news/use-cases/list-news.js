export default function makeListNews({ newsDb }) {
  return async function listNews({}) {
    return await newsDb.findAll()
  }
}
