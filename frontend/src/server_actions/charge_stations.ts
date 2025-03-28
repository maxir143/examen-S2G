'use server'

import {
  ChargeStationType,
  PartialChargeStationType,
} from '@/types/charge_stations'
import { getCookie } from './cookies'

type _GetResponse = {
  charge_stations: Array<ChargeStationType>
  error?: string
}

export async function get_charge_stations(
  limit: number = 100,
): Promise<_GetResponse> {
  const token = await getCookie('token')

  if (!token) {
    return {
      charge_stations: [],
      error: 'No token found',
    }
  }

  return await fetch(
    `${process.env.API_URL}/v1/change-station/list?limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
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

type _PutResponse = {
  error?: string
}

export async function update_charge_stations(
  id: string,
  data: Partial<PartialChargeStationType>,
): Promise<_PutResponse> {
  const token = await getCookie('token')

  if (!token) {
    return {
      error: 'No token found',
    }
  }

  return await fetch(`${process.env.API_URL}/v1/change-station/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text())
      }

      return {}
    })
    .catch((error) => {
      console.error(error)
      return { error: 'Error with API' }
    })
}

type _PostResponse =
  | {
      charge_station: ChargeStationType
      error?: undefined
    }
  | {
      charge_station?: undefined
      error: string
    }

export async function post_charge_stations(
  data: Partial<PartialChargeStationType>,
): Promise<_PostResponse> {
  const token = await getCookie('token')

  if (!token) {
    return {
      error: 'No token found',
    }
  }

  return await fetch(`${process.env.API_URL}/v1/change-station`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text())
      }

      const res_json: {
        message: string
        charge_station?: ChargeStationType
      } = await res.json()

      if (!res_json.charge_station) throw Error('No charge station created')

      return { charge_station: res_json.charge_station }
    })
    .catch((error) => {
      console.error(error)
      return { error: 'Error with API' }
    })
}
