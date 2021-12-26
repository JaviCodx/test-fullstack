import express from 'express'
import newsRouter from './routes/news.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(newsRouter)

app.get('/health', (req, res) => {
  res.status(200).send('Server is Up!')
})

app.all('*', (req, res) => {
  res.status(404).send('Endpoint Not Found')
})

export default app
