'use client'

import { ChargeStationType } from '@/types/charge_stations'
import { useState, useEffect } from 'react'
import { Marker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { useChargeStationStore } from '@/stores/charge_stations'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  useEffect(() => {
    set(serverStations)
  }, [])

  return (
    <APIProvider apiKey="">
      <Map
        className="aspect-square w-full rounded-lg overflow-hidden"
        defaultCenter={{ lat: defaultControls.lat, lng: defaultControls.long }}
        defaultZoom={defaultControls.scale}
        gestureHandling={'greedy'}
        colorScheme="DARK"
        renderingType="RASTER"
        disableDefaultUI
        disableDoubleClickZoom
        onClick={(e) => {
          select()
          router.replace(
            `/dashboard?lat=${e.detail.latLng?.lat}&long=${e.detail.latLng?.lng}`,
          )
        }
        }
      >
        {chargeStations.map((station) => (
          <Marker
            key={station.id}
            position={{ lat: station.lat, lng: station.long }}
            onClick={() => select(station.id)}
            opacity={station.active ? 1 : 0.5}
          />
        ))}
      </Map>

    </APIProvider>
  )
}
