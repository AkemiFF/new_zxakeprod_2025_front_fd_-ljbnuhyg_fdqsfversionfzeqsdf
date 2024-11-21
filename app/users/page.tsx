"use client"
import AppTopbar from "@/layouts/AppTopBar";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();

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
    ];

    return (
        <>
            <Head>
                <title>{t("home")}</title>
            </Head>
            <div className="min-h-screen bg-teal-800 text-white overflow-x-hidden">
                <AppTopbar home />
                <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 space-y-8">
                        <h1 className="text-4xl md:text-5xl font-light italic tracking-tight mb-8">
                            {t("welcome_home")}
                        </h1>
                        <div className="space-y-4">
                            {buttons.map((button, index) => (
                                <Link
                                    key={index}
                                    href={button.href}
                                    className="block bg-white text-black rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 md:p-6 items-center space-x-4"
                                >
                                    <div className="w-12 h-12 flex-shrink-0">
                                        <Image
                                            src={button.icon}
                                            alt={button.title}
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg">{button.title}</h2>
                                        <p className="text-gray-600">{button.subtitle}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:block w-full md:w-1/2">
                        <Image
                            src="/images/home.png"
                            alt="Home illustration"
                            width={500}
                            height={500}
                            className="mx-auto"
                        />
                    </div>
                </div>
                <footer className="absolute bottom-0 w-full py-4 px-6 flex justify-between text-sm bg-teal-900">
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
    );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
    return <>{page}</>;
};

