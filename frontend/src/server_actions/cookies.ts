'use server'

import { cookies } from 'next/headers'

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}

export async function setCookie(name: string, value: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(name, value)
}

export async function removeCookie(name: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}
