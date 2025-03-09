import { ChargeStationForm } from '@/components/charge_station_form'
import { LogOutButton } from '@/components/log_out_button'
import { StationsMap } from '@/components/map'
import { get_charge_stations } from '@/server_actions/charge_stations'

type SearchParams = Promise<{ [key: string]: string | undefined }>

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const values = await searchParams
  const { charge_stations, error } = await get_charge_stations()

  const lat = values.lat ? parseFloat(values.lat) : undefined
  const long = values.long ? parseFloat(values.long) : undefined

  return (
    <>
      {error && <small className="text-red-500">{error}</small>}
      <StationsMap
        serverStations={charge_stations}
        pin={
          lat && long
            ? {
              lat,
              long,
            }
            : undefined
        }
      />
      <ChargeStationForm
        initialValues={{
          lat,
          long,
        }}
      />
      <LogOutButton />
    </>
  )
}
