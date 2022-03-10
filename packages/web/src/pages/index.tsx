import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../component/header'
import withAuth from '../hoc/withAuth'
import useAuth from '../hooks/useAuth'

const Home: NextPage = () => {
    const { user } = useAuth()

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="main">
                <h1>Welcome {user?.email}</h1>

                <p>
                    Get started by editing <code>pages/index.tsx</code>
                </p>
            </main>
        </div>
    )
}

export default withAuth(Home)
