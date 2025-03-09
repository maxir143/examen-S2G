import type { Metadata } from 'next'
import { DotStatus } from '@/components/dot_status'
import '@/styles.css'
import { ToastContainer } from 'react-toastify'

export const metadata: Metadata = {
  title: 'S2G Energy'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className="w-full min-h-[100svh] m-0 flex flex-col justify-center items-center"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico" />
        <link href="/src/styles.css" rel="stylesheet" />
        <title>Examen S2G</title>
      </head>
      <body className="w-full min-h-[100svh] m-0 flex flex-col justify-center items-center">
        <div className="fixed top-1 right-2 z-30">
          <DotStatus />
        </div>
        <div className="flex flex-col justify-center items-center w-full min-h-[100svh] m-0">
          <div className="flex flex-col gap-4 p-2 max-w-[800px] w-full">
            {children}
          </div>
        </div>
        <ToastContainer hideProgressBar closeButton={false} pauseOnFocusLoss={false} pauseOnHover={false} />
      </body>
    </html>
  )
}
