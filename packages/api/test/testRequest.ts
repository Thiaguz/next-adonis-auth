import supertest, { CallbackHandler } from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
let TOKEN: string | null = null

const hook =
    (method = 'post') =>
    (url: string, callback?: CallbackHandler | undefined) =>
        supertest(BASE_URL)[method](url, callback).set('Authorization', `Bearer ${TOKEN}`) as supertest.Test

const request = {
    post: hook('post'),
    get: hook('get'),
    put: hook('put'),
    delete: hook('delete'),
    setToken: (token: string) => (TOKEN = token),
}

export default request
