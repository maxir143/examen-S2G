"use client"
import { logout } from '@/server_actions/auth'


export function LogOutButton() {
  return (
    <button
      className="btn btn-secondary"
      onClick={logout}
    >
      Log out
    </button>
  )
}
