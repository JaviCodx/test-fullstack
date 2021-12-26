import request from 'supertest'
import app from '../app'
import { db } from '../news/data-access/'
import makeFakeNews from '../../fixtures/news'

describe('News API', () => {
  afterEach(async () => {
    const collections = await db.collections()
    for (const colletion of collections) {
      await colletion.deleteMany({})
    }
  })

  it('can list all news', async () => {
    const fakeNews1 = makeFakeNews()
    const fakeNews2 = makeFakeNews()

    const req = request(app)

    await req.post('/api/news').send(fakeNews1).expect(201)
    await req.post('/api/news').send(fakeNews2).expect(201)

    const response = await req.get('/api/news').send({}).expect(200)
    expect(response.body.length).toBe(2)
  })

  it('can list only archived news', async () => {
    const fakeNews1 = makeFakeNews()
    const fakeNews2 = makeFakeNews({ archived: true })
    const fakeNews3 = makeFakeNews({ archived: true })

    const req = request(app)

    await req.post('/api/news').send(fakeNews1).expect(201)
    await req.post('/api/news').send(fakeNews2).expect(201)
    await req.post('/api/news').send(fakeNews3).expect(201)

    const response = await req
      .get('/api/news?archivedOnly=true')
      .send({})
      .expect(200)
    expect(response.body.length).toBe(2)
    expect(response.body.every((el) => el.archived === true)).toBe(true)
  })

  it('can post a news', async () => {
    const fakeNews = makeFakeNews()

    const req = request(app)

    const response = await req.post('/api/news').send(fakeNews).expect(201)

    expect(response.body.posted).toMatchObject(fakeNews)
  })

  it('fails post a news when invalid body', async () => {
    const fakeNews = makeFakeNews({ author: null })

    const req = request(app)

    await req.post('/api/news').send(fakeNews).expect(400)
  })

  it('can modify content of a news', async () => {
    const fakeNews = makeFakeNews()

    const req = request(app)

    const responsePosted = await req
      .post('/api/news')
      .send(fakeNews)
      .expect(201)

    const responseModified = await req
      .put(`/api/news/${responsePosted.body.posted.id}`)
      .send({ content: 'modified content' })
      .expect(201)

    expect(responseModified.body.modified.content).toBe('modified content')
  })

  it('fails modify a non existing news', async () => {
    const fakeNews = makeFakeNews()

    const req = request(app)

    const responseModified = await req
      .put(`/api/news/nonexisting`)
      .send({ content: 'modified content' })
      .expect(400)
  })

  it('can mark news as archived', async () => {
    const fakeNews = makeFakeNews()

    const req = request(app)

    const responsePosted = await req
      .post('/api/news')
      .send(fakeNews)
      .expect(201)

    const responseModified = await req
      .put(`/api/news/${responsePosted.body.posted.id}`)
      .send({ archived: true })
      .expect(201)

    expect(responseModified.body.modified.archived).toBe(true)
    expect(responseModified.body.modified.archivedOn).not.toBe(null)
  })

  it('can delete news', async () => {
    const fakeNews = makeFakeNews()

    const req = request(app)

    const responsePosted = await req
      .post('/api/news')
      .send(fakeNews)
      .expect(201)

    await req
      .delete(`/api/news/${responsePosted.body.posted.id}`)
      .send({})
      .expect(200)

    const response = await req.get('/api/news').send({}).expect(200)
    expect(response.body.length).toBe(0)
  })

  it('fails on delete non existing news', async () => {
    const fakeNews = makeFakeNews()

    const req = request(app)

    await req.delete(`/api/news/nonexisting`).send({}).expect(400)
  })
})
