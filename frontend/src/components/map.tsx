'use client'

import { ChargeStationType } from '@/types/charge_stations'
import { useState, useCallback, useRef } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'


type _Controls = {
  scale: number
  lat: number
  long: number
  canMove: boolean
}

export function Map({ chargeStations = [] }: { chargeStations?: Array<ChargeStationType> }) {
  const [controls, setControls] = useState<_Controls>({
    scale: 1800,
    lat: -102,
    long: 24,
    canMove: false,
  })
  const [counter, setCounter] = useState<number>(0)

  const requestRef = useRef<number | null>(null)

  const updatePosition = useCallback((movementX: number, movementY: number) => {
    setControls((pre) => {
      const newLat = pre.lat - movementX / 25
      const newLong = pre.long + movementY / 25
      return {
        ...pre,
        lat: Math.max(-120, Math.min(120, newLat)),
        long: Math.max(-40, Math.min(80, newLong)),
      }
    })
  }, [])

  const handleMouseMove = useCallback(
    (x: number, y: number) => {
      setCounter(pre => pre + 1)
      if (!controls.canMove) return
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      requestRef.current = requestAnimationFrame(() => {
        updatePosition(x, y)
      })
    },
    [controls.canMove, updatePosition]
  )


  return (
    <>
      <div className="absolute top-10 left-10">
        <li>
          pos {controls.lat} {controls.long}
        </li>
        <li>
          scale {controls.scale}
        </li>
      </div>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: controls.scale,
          center: [controls.lat, controls.long],
        }}
        onMouseMoveCapture={(e) => handleMouseMove(e.movementX, e.movementY)}
        onMouseDown={(e) => {
          e.preventDefault()
          setControls((pre) => ({
            ...pre,
            canMove: true,
          }))
        }}
        onMouseLeave={(e) => {
          e.preventDefault()
          setControls((pre) => ({
            ...pre,
            canMove: false,
          }))
        }}
        onMouseUp={(e) => {
          e.preventDefault()
          setControls((pre) => ({
            ...pre,
            canMove: false,
          }))
        }}
      >
        <Geographies geography="/map.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {chargeStations.map(({ lat, long, id, name }) => (
          <Marker key={id} coordinates={[lat, long]}>
            <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={15}
              style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </>
  )
}
