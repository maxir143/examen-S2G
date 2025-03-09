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
  const { set, chargeStations, select, selected, edit } =
    useChargeStationStore()
  const router = useRouter()

  useEffect(() => {
    set(serverStations)
  }, [])

  useEffect(() => {
    if (!selected) return
    setControls((pre) => ({
      ...pre,
      lat: selected.lat,
      long: selected.long,
      scale: Math.max(pre.scale, defaultControls.scale * 1.3),
    }))
    router.replace('/dashboard', { scroll: false })
  }, [selected])

  useEffect(() => {
    if (!pin) return
    setControls((pre) => ({
      ...pre,
      lat: pin.lat,
      long: pin.long,
      scale: Math.max(pre.scale, defaultControls.scale * 1.3),
    }))
  }, [pin])

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
          if (selected) {
            select()
            router.replace(`/dashboard`, { scroll: false })
            setControls(defaultControls)
            return
          }
          const lat = e.detail.latLng?.lat
          const long = e.detail.latLng?.lng
          if (lat && long) {
            router.replace(
              `/dashboard?lat=${lat.toFixed(6)}&long=${long.toFixed(6)}`,
              { scroll: false },
            )
          }
        }}
      >
        {pin && !selected && (
          <Marker
            key="TEMP_MARK"
            position={{ lat: pin.lat, lng: pin.long }}
            opacity={0.25}
            draggable
            onDragEnd={(e) => {
              const lat = e.latLng?.lat()
              const long = e.latLng?.lng()
              if (lat && long) {
                router.replace(
                  `/dashboard?lat=${lat.toFixed(6)}&long=${long.toFixed(6)}`,
                  { scroll: false },
                )
              }
            }}
          />
        )}
        {chargeStations.map((station) => (
          <Marker
            draggable={selected?.id == station.id}
            key={station.id}
            position={
              selected?.id == station.id
                ? {
                  lat: pin?.lat || station.lat,
                  lng: pin?.long || station.long,
                }
                : { lat: station.lat, lng: station.long }
            }
            onClick={() => select(station.id)}
            opacity={station.active ? 1 : 0.5}
            onDragEnd={(e) => {
              const lat = e.latLng?.lat()
              const long = e.latLng?.lng()
              if (lat && long) {
                router.replace(
                  `/dashboard?lat=${lat.toFixed(6)}&long=${long.toFixed(6)}`,
                  { scroll: false },
                )
              }
            }}
          />
        ))}
      </Map>
    </APIProvider>
  )
}
