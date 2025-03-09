'use client'

import { ChargeStationType } from '@/types/charge_stations'
import { useEffect, useState } from 'react'
import { Marker, APIProvider, Map } from '@vis.gl/react-google-maps'
import { useChargeStationStore } from '@/stores/charge_stations'
import { useRouter } from 'next/navigation'

type _Controls = {
  scale: number
  long: number
  lat: number
}

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
  const [controls, setControls] = useState<_Controls>(defaultControls)
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
        center={{
          lat: controls.lat,
          lng: controls.long,
        }}
        zoom={controls.scale}
        gestureHandling={'greedy'}
        colorScheme="FOLLOW_SYSTEM"
        renderingType="VECTOR"
        disableDefaultUI
        disableDoubleClickZoom
        clickableIcons={false}
        onCenterChanged={(e) => {
          const position = e.map.getCenter()
          if (position)
            setControls((pre) => ({
              ...pre,
              lat: position.lat(),
              long: position.lng(),
            }))
        }}
        onZoomChanged={(e) => {
          const scale = e.map.getZoom()
          if (scale) setControls((pre) => ({ ...pre, scale }))
        }}
        onClick={(e) => {
          const lat = e.detail.latLng?.lat
          const long = e.detail.latLng?.lng
          if (lat && long) {
            select()
            router.replace(`/dashboard?lat=${lat}&long=${long}`)
            setControls((pre) => ({
              ...pre,
              lat,
              long,
              scale: Math.max(pre.scale, defaultControls.scale * 1.3),
            }))
          }
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
              setControls((pre) => ({
                ...pre,
                lat: station.lat,
                long: station.long,
                scale: Math.max(pre.scale, defaultControls.scale * 1.3),
              }))
              router.replace(`/dashboard`)
            }}
            opacity={station.active ? 1 : 0.5}
          />
        ))}
      </Map>
    </APIProvider>
  )
}
