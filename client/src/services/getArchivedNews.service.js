export default function makeGetAllArchivedNewsService({ apiClient }) {
  return function getAllArchivedNews() {
    return apiClient.getAllNews({ params: { archivedOnly: true } });
  };
}
