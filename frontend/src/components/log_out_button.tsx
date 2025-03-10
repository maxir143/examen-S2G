"use client"
import { logout } from '@/server_actions/auth'


export function LogOutButton() {
  return (
    <button
      className="btn btn-ghost btn-xs"
      onClick={logout}
    >
      Log out
    </button>
  )
}
