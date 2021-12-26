import app from './app.js'

const start = async () => {
  app.listen(3010, () => {
    console.log('Listening on port 3010')
  })
}

start()
