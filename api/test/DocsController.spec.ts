import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test('ensure path to swagger docs works and return 302', async (assert) => {
  await supertest(BASE_URL).get(`/docs`).expect(302)
})

