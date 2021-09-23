import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test('ensure get address with valid CEP works and return 200', async (assert) => {
  await supertest(BASE_URL).get(`/address?cep=${52050390}`).expect(200)
})

test('ensure get address with invalid CEP works and return 400', async (assert) => {
  await supertest(BASE_URL).get(`/address?cep=${50000000}`).expect(400)
  await supertest(BASE_URL).get(`/address?cep=ahdhdhdd}`).expect(400)
})

test('ensure get address without CEP not works and return 400', async (assert) => {
  await supertest(BASE_URL).get(`/address`).expect(400)
})

