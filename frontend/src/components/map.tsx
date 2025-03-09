'use client'

import { ChargeStationType } from '@/types/charge_stations'
import { useState, useEffect } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { useChargeStationStore } from '@/stores/charge_stations'
import { ChargerIcon } from './icons/charger'

type _Controls = {
  scale: number
  lat: number
  long: number
}

export function Map({
  serverStations = [],
  error,
}: {
  serverStations?: Array<ChargeStationType>
  error?: string
}) {
  const { set, chargeStations, select, selected } = useChargeStationStore()

  const defaultControls = {
    scale: 200000,
    long: -99.08,
    lat: 19.5,
  }

  const [controls, setControls] = useState<_Controls>(defaultControls)

  useEffect(() => {
    set(serverStations)
  }, [])

  useEffect(() => {
    setControls((state) => ({
      ...state,
      scale: selected ? defaultControls.scale * 2 : defaultControls.scale,
      lat: selected?.lat ? selected.lat : defaultControls.lat,
      long: selected?.long ? selected.long : defaultControls.long,
    }))
  }, [selected])

  return (
    <ComposableMap
      style={{
        transition: 'transform 1s',
      }}
      projection="geoMercator"
      projectionConfig={{
        scale: controls.scale,
        center: [controls.long, controls.lat],
      }}
      className="rounded-lg"
    >
      <Geographies geography="/map.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#ecf0f1"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {chargeStations.map((station) => (
        <Marker
          key={station.id}
          coordinates={[station.long, station.lat]}
          onClick={() =>
            select(selected?.id == station.id ? undefined : station.id)
          }
          className="block m-auto"
          z={station.id == selected?.id ? 50 : 0}
        >
          <ChargerIcon
            fill={station.active ? '#27ae60' : '#c0392b'}
            stroke={
              station.id == selected?.id
                ? 'black'
                : station.active
                  ? '#2ecc71'
                  : '#e74c3c'
            }
            strokeWidth={station.id == selected?.id ? 6 : 1}
            x={
              station.id == selected?.id
                ? '-50px'
                : selected
                  ? '-50px'
                  : '-25px'
            }
            y={
              station.id == selected?.id
                ? '-50px'
                : selected
                  ? '-50px'
                  : '-25px'
            }
            width={
              station.id == selected?.id
                ? '150px'
                : selected
                  ? '100px'
                  : '50px'
            }
            height={
              station.id == selected?.id
                ? '150px'
                : selected
                  ? '100px'
                  : '50px'
            }
          />
          {station.id == selected?.id && (
            <text
              textAnchor="middle"
              y={35}
              style={{ fontFamily: 'system-ui', fill: '#000', zIndex: '50' }}
            >
              <b>{station.name}</b>
            </text>
          )}
        </Marker>
      ))}
    </ComposableMap>
  )
}
