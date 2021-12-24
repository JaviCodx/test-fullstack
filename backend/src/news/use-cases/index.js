import makeAddNews from './add-news'
import makeEditNews from './edit-news'
import makeListNews from './list-news'
import makeRemoveNews from './remove-news'
import newsDb from '../data-access'

const addNews = makeAddNews({ newsDb })
const editNews = makeEditNews({ newsDb })
const listNews = makeListNews({ newsDb })
const removeNews = makeRemoveNews({ newsDb })

const newsService = Object.freeze({ addNews, editNews, listNews, removeNews })
export default newsService
export { addNews, editNews, listNews, removeNews }
