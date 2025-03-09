import {
  ChargeStationType,
  PartialChargeStationType,
} from '@/types/charge_stations'
import { create } from 'zustand'

interface ChargeStationStore {
  selected: ChargeStationType | undefined
  chargeStations: Array<ChargeStationType>
  set: (stations: Array<ChargeStationType>) => void
  edit: (id: string, station: Partial<PartialChargeStationType>) => void
  remove: (id: string) => void
  select: (id?: string) => void
  add: (station: ChargeStationType) => void
}

export const useChargeStationStore = create<ChargeStationStore>()((set) => ({
  selected: undefined,
  chargeStations: [],
  add: (station) =>
    set((state) => ({
      ...state,
      chargeStations: [...state.chargeStations, station],
    })),
  set: (stations) => set((state) => ({ ...state, chargeStations: stations })),
  edit: (id, stations) =>
    set((state) => ({
      ...state,
      chargeStations: state.chargeStations.map((s) =>
        s.id != id ? s : { ...s, ...stations },
      ),
    })),
  remove: (id) =>
    set((state) => ({
      ...state,
      chargeStations: state.chargeStations.filter((s) => s.id != id),
    })),
  select: (id) =>
    set((state) => ({
      ...state,
      selected: !id ? undefined : state.chargeStations.find((s) => s.id == id),
    })),
}))
