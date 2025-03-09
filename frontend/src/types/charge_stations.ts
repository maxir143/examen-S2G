export interface ChargeStationType {
  id: string
  user_email: string
  name: string
  lat: number
  long: number
  capacity: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface PartialChargeStationType {
  name: string
  lat: number
  long: number
  capacity: number
  active: boolean
}
