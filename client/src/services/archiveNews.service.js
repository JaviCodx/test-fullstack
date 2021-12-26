export default function makeArchiveNewsService({ apiClient }) {
  return function arhiveNews({ id, news }) {
    return apiClient.putNews({ id, news: { ...news, archived: true } });
  };
}
