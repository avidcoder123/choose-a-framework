import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User auth', (group) => {
  test("Register a user", async function(assert) {
    let { text } = await supertest(BASE_URL)
    .post("/auth/register")
    .send({
      username: "register_AvidCoder123",
      password: "secret"
    })
    .expect(200) as any

    text = JSON.parse(text)

    assert.exists(text.token)

    let registered = await User.findBy("username", "register_AvidCoder123")

    assert.exists(registered)
  })
})
