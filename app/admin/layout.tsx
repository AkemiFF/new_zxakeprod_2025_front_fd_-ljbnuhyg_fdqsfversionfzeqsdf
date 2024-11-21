'use client'

import AdminLayout from "@/layouts/admin/AdminLayout"
import { AdminLayoutProvider } from "@/layouts/context/adminLayoutContext"

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminLayoutProvider>
            <AdminLayout>
                {children}

            </AdminLayout>
        </AdminLayoutProvider>)
}