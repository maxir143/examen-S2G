'use client'

import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useStore } from './store'
import { refreshToken } from '@/server_actions/auth'

type _Token = {
  id: string
  sub: string
  email: string
  iat: number
  exp: number
  active_exp: number
}

export function useAuth() {
  const { token, setToken, removeToken } = useStore()

  useEffect(() => {
    if (!token) return
    refreshToken(token).then(({ error, token }) => {
      if (token) {
        setToken(token)
      }
      if (error) {
        console.error(error)
      }
    })
  }, [])

  function getToken(): _Token | null {
    if (!token) return null
    return jwtDecode(token) as _Token
  }

  function logout(): void {
    removeToken()
  }

  function verifyToken():
    | { token: string; error: null }
    | { token: null; error: string } {
    if (!token) return { token: null, error: 'No token found' }
    const token_object = getToken()
    if (!token_object) return { token: null, error: 'Cant get token object' }
    const expiration_date = new Date(token_object.exp * 1000)
    const now = new Date()
    if (expiration_date < now) {
      return { token: null, error: 'Current token expired, please log in' }
    }
    return { token: token, error: null }
  }

  return {
    token,
    setToken,
    getToken,
    verifyToken,
    refreshToken,
    logout,
  }
}
