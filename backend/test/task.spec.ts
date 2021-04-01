import test from 'japa'
import supertest from 'supertest'
import Task from 'App/Models/Task'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group("Test tasks", async function() {
  test("List tasks", async function(assert) {
    //Register user first
    let token = (await supertest(BASE_URL)
    .post("/auth/register")
    .send({
      username: "task_AvidCoder123",
      password: "secret"
    })
    .expect(200)).text as any

    token = JSON.parse(token)

    let { text } = await supertest(BASE_URL)
    .get("/task/list")
    .set("Authorization", "Bearer " + token.token)
    .expect(200)

    assert.exists(text)
  })

  test("Create task", async function(assert) {
    //Register user first
    let token = (await supertest(BASE_URL)
    .post("/auth/register")
    .send({
      username: "create_AvidCoder123",
      password: "secret"
    })
    .expect(200)).text as any

    token = JSON.parse(token)

    let { text } = await supertest(BASE_URL)
    .post("/task/create")
    .send({
      title: "Do homework"
    })
    .set("Authorization", "Bearer " + token.token)
    .expect(200)
  })
})
