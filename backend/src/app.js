import express from 'express'
import newsRouter from './routes/news.js'

const app = express()
app.use(express.json())
app.use(newsRouter)

app.get('/health', (req, res) => {
  res.status(200).send('Server is Up!')
})

export default app
