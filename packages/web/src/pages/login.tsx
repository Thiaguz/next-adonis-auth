import type { GetServerSideProps, NextPage } from 'next'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { setNextContext } from '../services/api'
import auth from '../services/auth'
import Link from 'next/link'

type SignInFields = {
    email: string
    password: string
}

const Login: NextPage = () => {
    const { register, handleSubmit } = useForm<SignInFields>({
        defaultValues: { email: 'me@thiagobruno.dev', password: 'secret' },
    })

    const { signIn } = useAuth()

    const handleSignIn = (data: SignInFields) => {
        try {
            signIn(data.email, data.password)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSignIn)}>
            <input type="email" placeholder="Email" id="email" {...register('email')} />
            <input type="password" placeholder="Password" id="password" {...register('password')} />
            <button type="submit">Entrar</button>
            <Link href="/static">Static Page</Link>
        </form>
    )
}

/**
 * Redirect user to dashboard if logged in
 * @param ctx
 * @returns Promise<GetServerSidePropsResult<P>>
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    setNextContext(ctx)
    try {
        await auth.getUser()

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } catch (error) {
        return { props: {} }
    }
}

export default Login
