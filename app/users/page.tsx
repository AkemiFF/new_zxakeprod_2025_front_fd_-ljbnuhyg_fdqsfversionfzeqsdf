"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AppTopbar from "@/layouts/AppTopBar"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function Home() {
    const { t } = useTranslation()

    const buttons = [
        {
            href: "/users/accommodation",
            icon: "/images/users/accommodation.svg",
            title: t("accommodation"),
            subtitle: t("button_home_accommodation"),
        },
        {
            href: "/users/handcraft",
            icon: "/images/users/handcraft.svg",
            title: t("handcraft"),
            subtitle: t("button_home_handcraft"),
        },
        {
            href: "/users/tour",
            icon: "/images/users/tour.svg",
            title: t("tour"),
            subtitle: t("button_home_tour"),
        },
    ]

    return (
        <>
            <Head>
                <title>{t("home")}</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-teal-800 to-teal-600 text-white overflow-x-hidden">
                <AppTopbar home />
                <div className="container mx-auto px-4 py-12 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-5xl font-light italic tracking-tight mb-8">
                                {t("welcome_home")}
                            </h1>
                            <div className="grid gap-4">
                                {buttons.map((button, index) => (
                                    <Card key={index} className="bg-white/10 backdrop-blur-lg border-none hover:bg-white/20 transition-colors">
                                        <Link href={button.href}>
                                            <CardHeader className="flex flex-row items-center space-x-4">
                                                <Image
                                                    src={button.icon}
                                                    alt={button.title}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12"
                                                />
                                                <div>
                                                    <CardTitle className="text-xl font-semibold text-white">{button.title}</CardTitle>
                                                    <CardDescription className="text-teal-100">{button.subtitle}</CardDescription>
                                                </div>
                                            </CardHeader>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Image
                                src="/images/home.png"
                                alt="Home illustration"
                                width={500}
                                height={500}
                                className="mx-auto rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
                <footer className="absolute bottom-0 w-full py-4 px-6 flex justify-between text-sm bg-teal-900/80 backdrop-blur-sm">
                    <Link href="" className="hover:underline">
                        {t("terms_services")}
                    </Link>
                    <span>Copyright - {new Date().getFullYear()}</span>
                    <Link href="" className="hover:underline">
                        {t("private_policy")}
                    </Link>
                </footer>
            </div>
        </>
    )
}

