import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppTopBarResponsable from "./AppTopBarResponsable";

interface MenuItem {
    icon: string;
    iconFill: string;
    label: string;
    link?: string;
    command?: () => void;
}

interface ResponsableLayoutProps {
    children: React.ReactNode;
}

export default function ResponsableLayout({ children }: ResponsableLayoutProps) {
    const router = useRouter();
    const [links, setLinks] = useState<MenuItem[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<number | null>(null);

    // const { setUser, setTypeResponsable } = useContext(ResponsableLayoutContext);

    // const logOut = () => {
    //     localStorage.removeItem("responsable_user");
    //     localStorage.removeItem("type_responsable");
    //     setUser(null);
    //     setTypeResponsable(1);
    //     router.replace("/users/etablissement/login");
    // };

    useEffect(() => {
        if (router.asPath.includes("/responsable/accommodation")) {
            setLinks([
                {
                    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    iconFill: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    label: "Dashboard",
                    link: "/responsable/accommodation/dashboard"
                },
                // Add other menu items similarly
            ]);
        }
        // Add other conditions for different paths
    }, [router.asPath]);

    return (
        <>
            <Head>
                <title>Aftrip responsable</title>
            </Head>
            <AppTopBarResponsable />
            <div className="flex h-screen pt-16">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden fixed left-4 top-4 z-50 p-2 rounded-md hover:bg-gray-100"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 z-40 w-64 bg-gray-900 transition duration-200 ease-in-out`}>
                    <nav className="mt-16 px-4 py-6">
                        {links.map((link, index) => (
                            <div key={index} className="mb-2">
                                {link.command ? (
                                    <button
                                        onClick={() => {
                                            link.command?.();
                                            setActiveLink(index);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${activeLink === index ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeLink === index ? link.iconFill : link.icon} />
                                        </svg>
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        href={link.link || ''}
                                        onClick={() => {
                                            setActiveLink(index);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`flex items-center px-4 py-2 text-sm rounded-lg ${activeLink === index ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activeLink === index ? link.iconFill : link.icon} />
                                        </svg>
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </>
    );
}