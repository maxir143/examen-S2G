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
  const { lat, long } = await searchParams
  const { charge_stations, error } = await get_charge_stations()

  return (
    <>
      <StationsMap serverStations={charge_stations} error={error} />
      <ChargeStationForm
        initialValues={{
          lat: lat ? parseFloat(lat) : undefined,
          long: long ? parseFloat(long) : undefined,
        }}
      />
      <LogOutButton />
    </>
  )
}
