import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'

function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider defaultUser={pageProps.user}>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default App
