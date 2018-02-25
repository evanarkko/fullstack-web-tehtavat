const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)



test('blogs are returned', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog can be added', async () => {
    const testBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    await api
        .get('/api/blogs')
        .expect(res => res.body)

})

test('If likes not provided then likes = 0', async () => {
    const testBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        //no likes attr
    }

    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    await api
        .get('/api/blogs')
        .expect(res => res.body.likes)
        .expect(res => res.body.likes === 0)
})

test('If title/url not provided then 400 bad request', async () => {
    const testBlog1 = {
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }
    const testBlog2 = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(testBlog1)
        .expect(400)
    await api
        .post('/api/blogs')
        .send(testBlog2)
        .expect(400)
})

test('blog can be deleted', async () => {
    await api
        .del('api/blogs/')
})

afterAll(() => {
    server.close()
})

