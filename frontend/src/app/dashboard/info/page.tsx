import { ChargeStationForm } from '@/components/charge_station_form'
import { ChargeStationList } from '@/components/charge_station_list'
import { get_charge_stations } from '@/server_actions/charge_stations'
import Link from 'next/link'

export default async function InfoPage() {
  const { charge_stations, error } = await get_charge_stations()

  return (
    <>
      {error && <small className="text-red-500">{error}</small>}
      <ChargeStationForm initialValues={{}} />
      <ChargeStationList serverStations={charge_stations} />
      <Link href="/dashboard" className="btn w-full">
        See map
      </Link>
    </>
  )
}
