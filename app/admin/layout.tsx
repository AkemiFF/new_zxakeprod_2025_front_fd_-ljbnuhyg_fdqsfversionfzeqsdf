'use client'

import AdminLayout from "@/layouts/admin/AdminLayout"

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <AdminLayout>{children}</AdminLayout>
}