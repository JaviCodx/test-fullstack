import { Router } from 'express'

const router = Router()

router.get('/api/news', (req, res) => {
  res.status(200).send([])
})

export default router
