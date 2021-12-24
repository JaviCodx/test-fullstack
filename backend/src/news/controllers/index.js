import { addNews, editNews, listNews, removeNews } from '../use-cases'
import makeDeleteNews from './delete-news'
import makeGetNews from './get-news'
import makePostNews from './post-news'
import makePutNews from './put-news'

const deleteNews = makeDeleteNews({ removeNews })
const getNews = makeGetNews({ listNews })
const postNews = makePostNews({ addNews })
const putNews = makePutNews({ editNews })

const newsController = Object.freeze({
  deleteNews,
  getNews,
  postNews,
  putNews
})

export default newsController
export { deleteNews, getNews, postNews, putNews }
