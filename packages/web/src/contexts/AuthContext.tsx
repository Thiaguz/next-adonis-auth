import { createContext, ReactNode, useEffect, useState } from 'react'
import auth from '../services/auth'
import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'

export type User = {
    id: number
    email: string
}

type AuthProviderProps = {
    children: ReactNode
    defaultUser?: User | null
}

export type AuthContextValues = {
    isAuthenticated: boolean
    user?: User | null
    signIn: (email: string, password: string) => Promise<void>
    setUser: (user: User) => void
}

export const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children, defaultUser }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null | undefined>(defaultUser)
    const isAuthenticated = !!user

    useEffect(() => {
        if (!user) setUser(defaultUser)
    }, [defaultUser])

    const signIn = async (email: string, password: string) => {
        try {
            const user = await auth.signIn(email, password)

            const { redirectAfterLogin } = parseCookies()

            if (redirectAfterLogin) destroyCookie(null, 'redirectAfterLogin')

            setUser(user)
            Router.push(redirectAfterLogin ?? '/')
        } catch (error: any) {
            if (error?.request) alert(error.request.responseText)
        }
    }

    return <AuthContext.Provider value={{ isAuthenticated, signIn, user, setUser }}>{children}</AuthContext.Provider>
}
