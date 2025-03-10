'use client'
import { apiStatus } from '@/server_actions/status'
import { useEffect, useState } from 'react'

export function DotStatus({ delay = 1000 }: { delay?: number }) {
  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      apiStatus().then((status) => setStatus(status)).catch(() => setStatus(false))
    }, delay)

    return () => clearInterval(intervalId)
  }, [delay])

  return (
    <div className="inline-grid *:[grid-area:1/1]">
      <span
        className={`status animate-ping  ${status ? 'status-success' : 'status-error'}`}
      />
      <span
        className={`status   ${status ? 'status-success' : 'status-error'}`}
      />
    </div>
  )
}
