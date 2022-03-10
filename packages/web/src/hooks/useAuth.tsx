import { useContext } from 'react'
import { AuthContext, AuthContextValues } from '../contexts/AuthContext'

export default function useAuth() {
    return useContext(AuthContext) as AuthContextValues
}
