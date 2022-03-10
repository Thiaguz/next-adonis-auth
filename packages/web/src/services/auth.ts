import api from './api'
import { setCookie } from 'nookies'
import ms from 'ms'
import { User } from '../contexts/AuthContext'

async function signIn(email: string, password: string) {
    const {
        data: { auth, user },
    } = await api.post('/user/token', { email, password })

    setCookie(null, 'token', auth.token, { maxAge: ms('30days') })

    return user as User
}

async function getUser() {
    const { data: user } = await api.get('/user')
    return user as User
}

const auth = {
    signIn,
    getUser,
}

export default auth
