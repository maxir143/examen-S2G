'use client'

import { ChargeStationType } from '@/types/charge_stations'
import { useState, useEffect } from 'react'
import { Marker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { useChargeStationStore } from '@/stores/charge_stations'

type _Controls = {
  scale: number
  lat: number
  long: number
}

const defaultControls = {
  scale: 11,
  long: -99.08,
  lat: 19.5,
}

export function StationsMap({
  serverStations = [],
  error,
}: {
  serverStations?: Array<ChargeStationType>
  error?: string
}) {
  const { set, chargeStations, select, selected } = useChargeStationStore()
  const [controls, setControls] = useState<_Controls>(defaultControls)

  useEffect(() => {
    set(serverStations)
  }, [])

  useEffect(() => {
    setControls((state) => ({
      ...state,
      scale: selected ? defaultControls.scale * 1.4 : defaultControls.scale,
      lat: selected?.lat ? selected.lat : defaultControls.lat,
      long: selected?.long ? selected.long : defaultControls.long,
    }))
  }, [selected])

  return (
    <APIProvider apiKey="">
      <Map
        className="aspect-square w-full rounded-lg overflow-hidden"
        defaultCenter={{ lat: defaultControls.lat, lng: defaultControls.long }}
        defaultZoom={defaultControls.scale}
        gestureHandling={'greedy'}
        colorScheme="DARK"
        renderingType="RASTER"
        zoom={controls.scale}
        center={{ lat: controls.lat, lng: controls.long }}
        disableDefaultUI
        disableDoubleClickZoom
        onClick={() => select()}
      >
        {chargeStations.map((station) => (
          <Marker
            key={station.id}
            position={{ lat: station.lat, lng: station.long }}
            onClick={() =>
              select(station.id)
            }
            opacity={station.active ? 1 : 0.5}
          />
        ))}
      </Map>
    </APIProvider>
  )
}

{
  /* <Pin */
}
// scale={station.id == selected?.id ? 2 : selected ? 1 : 0.8}
// fill={station.active ? '#27ae60' : '#c0392b'}
// stroke={
//   station.id == selected?.id
//     ? 'white'
//     : station.active
//       ? '#2ecc71'
//       : '#e74c3c'
// }
// />
