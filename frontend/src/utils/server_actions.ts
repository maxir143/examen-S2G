'use server'

type _BasicAuth = {
  email: string
  password: string
}

export async function login({
  email,
  password,
}: _BasicAuth): Promise<
  { token: string; error: null } | { token: null; error: string }
> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text())
      }

      const res_json: { message: string; data?: { token?: string } } =
        await res.json()

      const token = res_json?.data?.token

      if (!token) {
        throw new Error('Response do not contain token')
      }

      return { token, error: null }
    })
    .catch((error) => {
      console.error(error)
      return { token: null, error: error.message }
    })
}

export async function signUp({
  email,
  password,
}: _BasicAuth): Promise<{ success: boolean; error: string | null }> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      if (res.ok) {
        return { success: true, error: null }
      }
      throw new Error(await res.text())
    })
    .catch((error) => {
      console.error(error)
      return { success: false, error: error.message }
    })
}

export async function refreshToken(
  token: string,
): Promise<{ token: string; error: null } | { token: null; error: string }> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/token/refresh`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text())
      }
      const res_json: { message: string; data?: { token?: string } } =
        await res.json()
      const token = res_json?.data?.token
      if (!token) {
        throw new Error('Response do not contain token')
      }
      return { token, error: null }
    })
    .catch((error) => {
      console.error(error)
      return { token: null, error: error.message }
    })
}
