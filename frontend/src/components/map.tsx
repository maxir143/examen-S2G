'use client'

import { ChargeStationType } from '@/types/charge_stations'
import { useEffect } from 'react'
import { Marker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { useChargeStationStore } from '@/stores/charge_stations'
import { useRouter } from 'next/navigation'

const defaultControls = {
  scale: 11,
  long: -99.08,
  lat: 19.5,
}

export function StationsMap({
  serverStations = [],
  pin,
}: {
  serverStations?: Array<ChargeStationType>
  pin?: { lat: number; long: number }
}) {
  const { set, chargeStations, select, selected } = useChargeStationStore()
  const router = useRouter()

  useEffect(() => {
    set(serverStations)
  }, [])

  return (
    <APIProvider apiKey="">
      <Map
        className="aspect-square w-full rounded-xl overflow-hidden min-w-full"
        defaultCenter={{ lat: defaultControls.lat, lng: defaultControls.long }}
        defaultZoom={defaultControls.scale}
        gestureHandling={'greedy'}
        colorScheme="FOLLOW_SYSTEM"
        renderingType="VECTOR"
        disableDefaultUI
        disableDoubleClickZoom
        clickableIcons={false}
        onClick={(e) => {
          select()
          router.replace(
            `/dashboard?lat=${e.detail.latLng?.lat}&long=${e.detail.latLng?.lng}`,
          )
        }}
      >
        {pin && (
          <Marker key="TEMP_MARK" position={{ lat: pin.lat, lng: pin.long }} />
        )}
        {chargeStations.map((station) => (
          <Marker
            key={station.id}
            position={{ lat: station.lat, lng: station.long }}
            onClick={() => {
              select(station.id)
              router.replace(
                `/dashboard`,
              )
            }}
            opacity={station.active ? 1 : 0.5}
          />
        ))}
      </Map>
    </APIProvider>
  )
}
