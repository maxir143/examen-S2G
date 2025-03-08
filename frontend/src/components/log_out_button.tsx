'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/utils/useAuth'
import { useState } from 'react'

export function LogOutButton() {
  const [loading, setLoading] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()
  return (
    <button
      disabled={loading}
      className="btn btn-secondary"
      onClick={async () => {
        setLoading(true)
        logout()
          .then(() => {
            router.push('/login')
          })
          .finally(() => setLoading(false))
      }}
    >
      Log out
    </button>
  )
}
