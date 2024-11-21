'use client'

import ResponsableLayout from "@/layouts/responsable/ResponsableLayout"

export default function ResponsableRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ResponsableLayout>{children}</ResponsableLayout>
}