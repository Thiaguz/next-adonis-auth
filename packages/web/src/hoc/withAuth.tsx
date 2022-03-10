import { NextComponentType, NextPageContext } from 'next'
import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { setNextContext } from '../services/api'
import auth from '../services/auth'

export default function withAuth(Component: NextComponentType) {
    Component.getInitialProps = async function (ctx: NextPageContext) {
        const { token: token } = parseCookies(ctx)
        setNextContext(ctx)

        const redirectToLogin = () => {
            if (ctx.req && ctx.res) {
                setCookie(ctx, 'redirectAfterLogin', ctx.req.url ?? '/')
                ctx.res.writeHead(302, { Location: '/login' })
                ctx.res.end()
            } else {
                setCookie(null, 'redirectAfterLogin', Router.pathname ?? '/')
                Router.push('/login')
            }

            return { redirectToLogin: true }
        }

        if (!token) {
            return redirectToLogin()
        }

        try {
            const user = await auth.getUser()

            return {
                user,
            }
        } catch (error) {
            return redirectToLogin()
        }
    }

    return Component
}
