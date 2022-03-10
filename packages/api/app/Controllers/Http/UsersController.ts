import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
    /**
     * createToken
     */
    public async createToken({ auth, request, response }: HttpContextContract) {
        const email: string = request.input('email')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(email, password, { expiresIn: '30days' })
            return { auth: token, user: auth.user! }
        } catch {
            return response.badRequest('Invalid credentials')
        }
    }

    /**
     * getLoggedUser
     */
    public async getLoggedUser({ auth }: HttpContextContract) {
        return auth.user!
    }
}
