import Link from 'next/link'
import { setCookie } from 'nookies'
import React from 'react'
import useAuth from '../hooks/useAuth'
import Router from 'next/router'

export default function Header() {
    const { user } = useAuth()

    return (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
            <h2>next-adonis-auth</h2>

            <span>{user?.email}</span>

            <nav>
                <Link href="/">
                    <a style={{ marginRight: 10 }}>Home</a>
                </Link>
                <Link href="/static">
                    <a style={{ marginRight: 10 }}>Static</a>
                </Link>
                {user && (
                    <button
                        onClick={() => {
                            setCookie(null, 'token', 'invalid')
                            Router.push('/login')
                        }}
                    >
                        Logout
                    </button>
                )}
            </nav>
        </header>
    )
}
