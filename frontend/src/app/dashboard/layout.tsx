import { getCookie } from '@/server_actions/cookies'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const token = await getCookie('token')

  if (!token) redirect("/login")

  return children
}
