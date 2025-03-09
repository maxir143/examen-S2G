import { ChargeStationForm } from '@/components/charge_station_form'
import { LogOutButton } from '@/components/log_out_button'
import { Map } from '@/components/map'
import { get_charge_stations } from '@/server_actions/charge_stations'

export default async function Page() {
  const { charge_stations, error } = await get_charge_stations()

  return (
    <>
      <Map serverStations={charge_stations} error={error} />
      <ChargeStationForm />
      <LogOutButton />
    </>
  )
}
