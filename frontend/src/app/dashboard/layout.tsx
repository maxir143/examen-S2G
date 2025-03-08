'use client'
import { useAuth } from '@/utils/useAuth'
import { useRouter } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { getToken, verifyToken, logout } = useAuth()
  const { error } = verifyToken()

  const token_object = getToken()
  const router = useRouter()

  if (!token_object) {
    router.push('/login')
  }

  if (error) {
    logout()
    router.push('/login')
  }

  return children
}
