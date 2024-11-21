'use client'

import { ResponsableLayoutProvider } from "@/layouts/context/responsableLayoutContext"
import ResponsableLayout from "@/layouts/responsable/ResponsableLayout"

export default function ResponsableRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ResponsableLayoutProvider>
            <ResponsableLayout>{children}</ResponsableLayout>
        </ResponsableLayoutProvider>)
}