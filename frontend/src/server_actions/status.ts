'use server'

export async function apiStatus(): Promise<boolean> {
  return await fetch(`${process.env.API_URL}/status`, {
    method: 'GET',
  })
    .then((res) => {
      return res.ok
    })
    .catch((error) => {
      console.debug(error)
      return false
    })
}
