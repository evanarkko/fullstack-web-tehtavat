const supertest = require('supertest')
const {app, server} = require('../index')
const api = supertest(app)

describe("Bad user can't be added", () => {
    test("Password longer than 3 characters", async () => {
        const testUser = {
            name: "evan",
            username: "superevan",
            password: "mo"
        }

        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test("Username has to be unique", async () => {
        const testUser1 = {
            name: "evan",
            username: "superevan",
            password: "moikka"
        }
        const testUser2 = {
            name: "evan",
            username: "superevan",
            password: "moikkeli"
        }

        await api
            .post("/api/users")
            .send(testUser1)

        await api
            .post("/api/users")
            .send(testUser2)
            .expect(400)
    })
})


afterAll(() => {
    server.close()
})