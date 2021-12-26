export default function makeApiClient({ config, serializeParams }) {
  return Object.freeze({
    getAllNews: async ({ params } = {}) =>
      config.get(`/news${serializeParams(params)}`),
    postNews: async ({ news }) => config.post('/news', news),
    putNews: async ({ id, news }) => config.put(`/news/${id}`, news),
    deleteNews: async ({ id }) => config.delete(`/news/${id}`),
  });
}
