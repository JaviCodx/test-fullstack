import makeNews from '../entities'
export default function makeAddNews({ newsDb }) {
  return async function addNews(newsInfo) {
    const news = makeNews(newsInfo)

    return newsDb.insert({
      author: news.getAuthor(),
      createdOn: news.getCreatedOn(),
      title: news.getTitle(),
      description: news.getDescription(),
      content: news.getContent(),
      archivedOn: news.getArchivedOn(),
      archived: news.isArchived()
    })
  }
}
