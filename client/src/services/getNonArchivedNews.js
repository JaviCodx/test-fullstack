export default function makeGetNonArchivedNewsService({ apiClient }) {
  return function getAllArchivedNews() {
    return apiClient.getAllNews({ params: { nonArchivedOnly: true } });
  };
}
