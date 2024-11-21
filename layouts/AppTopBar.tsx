import { removeAccessClient, removeAllAdminAccess } from '@/util/Cookies';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LayoutContext from './context/layoutContext';

interface AppTopbarProps {
    home?: boolean;
}

export default function AppTopbar({ home }: AppTopbarProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const { user, setUser, lang, setLang } = useContext(LayoutContext);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [userMenuVisible, setUserMenuVisible] = useState(false);
    const [langMenuVisible, setLangMenuVisible] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const langMenuRef = useRef<HTMLDivElement>(null);

    const getLabelAvatar = (str: string) => str && str.length > 0 ? str.charAt(0).toUpperCase() : '';

    const logOut = () => {
        Cookies.remove("aofdimnnfiodfsnlmaiaftripacciop__");
        Cookies.remove("profile_user");
        Cookies.remove("username");
        Cookies.remove("fdsqomnnkoegnlfnoznflzaftripkfdsmorefi_");
        localStorage.removeItem('adminUser');
        removeAllAdminAccess();
        removeAccessClient();
        router.push("/users");
        setUser(null);
    };

    const userMenuItems = [
        { label: t("profil"), icon: 'user', href: "/users/profil" },
        { label: t("shopping_cart"), icon: 'shopping-cart', href: "/users/cart" },
        { label: `${t("setting")}s`, icon: 'cog', href: "/users/setting" },
        { label: t("log_out"), icon: 'log-out', onClick: logOut },
    ];

    const navItems = [
        { href: "/users", label: t("home") },
        { href: "/users/accommodation", label: t("accommodation") },
        { href: "/users/handcraft", label: t("handcraft") },
        { href: "/users/tour", label: t("tour") },
        { href: "/users/about", label: t("about_us") },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuVisible(false);
            }
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setLangMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 ${home ? 'bg-transparent' : 'bg-white shadow-md'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/users" className="flex-shrink-0">
                            <Image src="/images/logo-aftrip.png" alt="logo" width={100} height={40} />
                        </Link>
                        <div className="hidden md:flex space-x-4">
                            {navItems.map((item, index) => (
                                <Link key={index} href={item.href} className="text-gray-700 hover:text-gray-900">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative" ref={langMenuRef}>
                                <button
                                    onClick={() => setLangMenuVisible(!langMenuVisible)}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                    {lang}
                                </button>
                                {langMenuVisible && (
                                    <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <button onClick={() => { setLang("en"); setLangMenuVisible(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">En</button>
                                            <button onClick={() => { setLang("fr"); setLangMenuVisible(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Fr</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {user ? (
                                <div className="relative" ref={userMenuRef}>
                                    <div
                                        onClick={() => setUserMenuVisible(!userMenuVisible)}
                                        className="flex items-center space-x-2 cursor-pointer"
                                    >
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                            {getLabelAvatar(user.username)}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{user.username}</span>
                                    </div>
                                    {userMenuVisible && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                {userMenuItems.map((item, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            setUserMenuVisible(false);
                                                            if (item.onClick) item.onClick();
                                                            else if (item.href) router.push(item.href);
                                                        }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    >
                                                        <i className={`mr-3 fas fa-${item.icon}`}></i>
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-x-2">
                                    <button onClick={() => router.push("/users/login")} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                                        {t("login")}
                                    </button>
                                    <button onClick={() => router.push("/users/register")} className={`px-3 py-2 text-sm font-medium ${home ? 'text-gray-700 hover:text-gray-900' : 'bg-blue-500 text-white hover:bg-blue-600'} rounded`}>
                                        {t("register")}
                                    </button>
                                    <button onClick={() => router.push("/users/etablissement/addEmail")} className={`px-3 py-2 text-sm font-medium ${home ? 'text-gray-700 hover:text-gray-900' : 'bg-green-500 text-white hover:bg-green-600'} rounded`}>
                                        + Add etablissement
                                    </button>
                                </div>
                            )}
                            <button onClick={() => setSidebarVisible(true)} className="md:hidden text-gray-700 hover:text-gray-900">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {sidebarVisible && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSidebarVisible(false)}></div>
                    <div className="absolute inset-y-0 right-0 max-w-full flex">
                        <div className="relative w-screen max-w-md">
                            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">Menu</h2>
                                        <button onClick={() => setSidebarVisible(false)} className="text-gray-400 hover:text-gray-500">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                    <div className="flex flex-col space-y-4">
                                        {navItems.map((item, index) => (
                                            <Link key={index} href={item.href} className="text-gray-700 hover:text-gray-900" onClick={() => setSidebarVisible(false)}>
                                                {item.label}
                                            </Link>
                                        ))}
                                        <hr className="my-4" />
                                        {user ? (
                                            <>
                                                <Link href="/users/profil" className="flex items-center space-x-2" onClick={() => setSidebarVisible(false)}>
                                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                                        {getLabelAvatar(user.username)}
                                                    </div>
                                                    <span>{user.username}</span>
                                                </Link>
                                                <button onClick={() => { logOut(); setSidebarVisible(false); }} className="text-left text-gray-700 hover:text-gray-900">
                                                    {t("log_out")}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link href="/users/login" className="text-gray-700 hover:text-gray-900" onClick={() => setSidebarVisible(false)}>{t("login")}</Link>
                                                <Link href="/users/register" className="text-gray-700 hover:text-gray-900" onClick={() => setSidebarVisible(false)}>{t("register")}</Link>
                                                <Link href="/users/etablissement/addEmail" className="text-gray-700 hover:text-gray-900" onClick={() => setSidebarVisible(false)}>Add etablissement</Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

