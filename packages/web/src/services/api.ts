import axios from 'axios'
import { NextPageContext } from 'next'
import { parseCookies } from 'nookies'

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333',
})

type ParseCookiesContext = Pick<NextPageContext, 'req'>

let nextContext: ParseCookiesContext | null = null

api.interceptors.request.use((config) => {
    const { token: token } = parseCookies(nextContext)

    if (!token) return config

    config.headers = {
        Authorization: `Bearer ${token}`,
        ...config.headers,
    }

    return config
})

export function setNextContext(ctx: ParseCookiesContext) {
    nextContext = ctx
}

export default api
