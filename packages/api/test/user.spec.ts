import User from 'App/Models/User'
import test from 'japa'
import request from './testRequest'

test.group('- User tests', () => {
    test('ensure user password gets hashed during save', async (assert) => {
        const user = new User()
        user.email = 'me@thiagobruno.dev'
        user.password = 'secret'
        await user.save()

        assert.notEqual(user.password, 'secret')
    })

    test('ensure user can create a bearer token', async (assert) => {
        const { body } = await request
            .post('/user/token')
            .send({ email: 'me@thiagobruno.dev', password: 'secret' })
            .expect(200)

        const { auth } = body

        assert.hasAllKeys(auth, ['type', 'token', 'expires_at'])

        assert.isString(auth.token)
        assert.equal(auth.type, 'bearer')

        request.setToken(auth.token)
    })

    test('ensure user can return your informations', async (assert) => {
        const { body: user } = await request.get('/user').expect(200)

        assert.hasAllKeys(user, ['id', 'email', 'created_at', 'remember_me_token', 'updated_at'])
        assert.equal(user.email, 'me@thiagobruno.dev')
    })

    test("ensure user can't acess protected routes", async (assert) => {
        request.setToken('')

        const { body: user } = await request.get('/user').expect(401)

        assert.isArray(user.errors)
        assert.equal(user.errors[0].message, 'E_UNAUTHORIZED_ACCESS: Unauthorized access')
    })
})
