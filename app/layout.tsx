'use client'

import { Button } from "@/components/ui/button"
import { AdminLayoutProvider } from "@/layouts/context/adminLayoutContext"
import { LayoutProvider } from "@/layouts/context/layoutContext"
import { LocationProvider } from "@/layouts/context/locationContext"
import { NavigationProvider } from "@/layouts/context/navigation"
import { ResponsableLayoutProvider } from "@/layouts/context/responsableLayoutContext"
import dynamic from "next/dynamic"
import Script from "next/script"
import 'primeicons/primeicons.css'
import "primereact/resources/themes/lara-light-cyan/theme.css"
import { useState } from "react"
import './globals.css'

const ChatBot = dynamic(() => import('@/components/ChatBot'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [visible, setVisible] = useState(false)

  if (process.env.NODE_ENV === 'production') {
    if (typeof window !== 'undefined') {
      document.addEventListener('contextmenu', (event) => event.preventDefault())
      document.addEventListener('keydown', (event) => {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'C')) {
          event.preventDefault()
        }
      })
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content="Aftrip website" />
        <link rel="shortcut icon" href="/images/logo-aftrip.png" type="image/x-icon" />
      </head>
      <body>
        <NavigationProvider>
          <ResponsableLayoutProvider>
            <LocationProvider>
              <LayoutProvider>
                <AdminLayoutProvider>
                  <Button
                    onClick={() => setVisible(true)}
                    className="chat_bot_btn"

                  />
                  <ChatBot
                    visible={visible}
                    onHide={() => setVisible(false)}
                  />
                  {children}
                </AdminLayoutProvider>
              </LayoutProvider>
            </LocationProvider>
          </ResponsableLayoutProvider>
        </NavigationProvider>


        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT}&currency=EUR`}
          strategy="beforeInteractive"
        />

        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                    const noop = () => {};
                    console.log = noop;
                    console.info = noop;
                    console.warn = noop;
                    console.error = noop;
                    console.debug = noop;
                    console.dir = noop;
                    console.dirxml = noop;
                    console.trace = noop;
                    console.assert = noop;
                    console.group = noop;
                    console.groupCollapsed = noop;
                    console.groupEnd = noop;
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}