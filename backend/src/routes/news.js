import { Router } from 'express'
import { deleteNews, getNews, postNews, putNews } from '../news/controllers'
import makeExpressCallback from '../utils/makeExpressCallback'

const router = Router()

router.get('/api/news', makeExpressCallback(getNews))
router.post('/api/news', makeExpressCallback(postNews))
router.delete('/api/news/:id', makeExpressCallback(deleteNews))
router.put('/api/news/:id', makeExpressCallback(putNews))
export default router
