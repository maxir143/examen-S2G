'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/utils/useAuth'

export function LogOutButton() {
  const { logout } = useAuth()
  const router = useRouter()
  return (
    <button
      className="btn btn-secondary"
      onClick={() => {
        logout()
        router.push('/login')
      }}
    >
      Log out
    </button>
  )
}
