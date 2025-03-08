'use client'
import { useAuth } from '@/utils/useAuth'
import { useRouter } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { getToken, removeToken, verifyToken } = useAuth()

  const token_object = getToken()
  const router = useRouter()

  if (!token_object) {
    router.replace('/login')
  }

  const { error } = verifyToken()

  if (error) {
    removeToken()
    router.push('/login')
  }

  return children
}
