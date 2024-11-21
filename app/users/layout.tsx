
'use client'

import { LayoutProvider } from "@/layouts/context/layoutContext"

export default function ResponsableRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <LayoutProvider>{children}</LayoutProvider>

}