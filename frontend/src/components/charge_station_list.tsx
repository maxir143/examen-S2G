'use client'

import { useChargeStationStore } from '@/stores/charge_stations'
import { ChargeStationType } from '@/types/charge_stations'
import { useEffect } from 'react'

type _Column = {
  name: keyof ChargeStationType
  units?: string
  representation?: (value: any) => string | number
}

export function ChargeStationList({
  serverStations = [],
}: {
  serverStations?: Array<ChargeStationType>
}) {
  const { selected, select, set, chargeStations } = useChargeStationStore()

  const columns: Array<_Column> = [
    { name: 'name' },
    {
      name: 'capacity',
      units: 'kw/h',
      representation: (value) => value / 1000,
    },
    { name: 'active', representation: (value) => (value ? 'Yes' : 'No') },
    { name: 'lat' },
    { name: 'long' },
  ]

  useEffect(() => {
    set(serverStations)
    select(serverStations[0].id)
  }, [])

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-cols w-full">
        <thead>
          <tr>
            {columns.map(({ name, units }) => (
              <th key={name}>
                {name}
                {units && <small className="text-xs"> {units}</small>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chargeStations.map((station) => (
            <tr
              key={station.id}
              onClick={() => select(station.id)}
              className={selected?.id == station.id ? 'bg-base-300' : ''}
            >
              {columns.map(({ name, representation }, i) => (
                <td
                  key={station.id + name}
                  className={i == 0 ? 'font-bold' : ''}
                >
                  {representation
                    ? representation(station[name])
                    : station[name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
