import { ChargeStationType } from '@/types/charge_stations'
import { cookies } from 'next/headers'

type _Response = {
  charge_stations: Array<ChargeStationType>
  error?: string
}

export async function get_charge_stations(): Promise<_Response> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  if (!token) {
    return {
      charge_stations: [],
      error: 'No token found',
    }
  }

  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/change-station/list`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token.value,
      },
    },
  )
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text())
      }

      const res_json: {
        message: string
        charge_stations?: Array<ChargeStationType>
      } = await res.json()

      const charge_stations = res_json?.charge_stations

      if (!charge_stations) {
        throw new Error('Charge Stations not found')
      }

      return { charge_stations }
    })
    .catch((error) => {
      console.error(error)
      return { charge_stations: [], error: error.message }
    })
}
