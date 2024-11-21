"use client"

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { removeAccessClient, removeAllAdminAccess } from '@/util/Cookies'
import Cookies from 'js-cookie'
import { Globe, LogOut, Menu, Settings, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import LayoutContext from './context/layoutContext'

interface AppTopbarProps {
    home?: boolean
}

export default function AppTopbar({ home }: AppTopbarProps) {
    const { t } = useTranslation()
    const router = useRouter()
    const { user, setUser, lang, setLang } = useContext(LayoutContext)

    const getLabelAvatar = (str: string) => str && str.length > 0 ? str.charAt(0).toUpperCase() : ''

    const logOut = () => {
        Cookies.remove("aofdimnnfiodfsnlmaiaftripacciop__")
        Cookies.remove("profile_user")
        Cookies.remove("username")
        Cookies.remove("fdsqomnnkoegnlfnoznflzaftripkfdsmorefi_")
        localStorage.removeItem('adminUser')
        removeAllAdminAccess()
        removeAccessClient()
        router.push("/users")
        setUser(null)
    }

    const userMenuItems = [
        { label: t("profil"), icon: User, href: "/users/profil" },
        { label: t("shopping_cart"), icon: ShoppingCart, href: "/users/cart" },
        { label: `${t("setting")}s`, icon: Settings, href: "/users/setting" },
        { label: t("log_out"), icon: LogOut, onClick: logOut },
    ]

    const navItems = [
        { href: "/users", label: t("home") },
        { href: "/users/accommodation", label: t("accommodation") },
        { href: "/users/handcraft", label: t("handcraft") },
        { href: "/users/tour", label: t("tour") },
        { href: "/users/about", label: t("about_us") },
    ]

    return (
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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Globe className="mr-2 h-4 w-4" />
                                    {lang.toUpperCase()}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setLang("fr")}>Français</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{getLabelAvatar(user.username)}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {userMenuItems.map((item, index) => (
                                        <DropdownMenuItem
                                            key={index}
                                            onClick={() => {
                                                if (item.onClick) item.onClick()
                                                else if (item.href) router.push(item.href)
                                            }}
                                        >
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.label}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="space-x-2">
                                <Button variant="ghost" onClick={() => router.push("/users/login")}>
                                    {t("login")}
                                </Button>
                                <Button variant={home ? "ghost" : "default"} onClick={() => router.push("/users/register")}>
                                    {t("register")}
                                </Button>
                                <Button variant="outline" onClick={() => router.push("/users/etablissement/addEmail")}>
                                    + Add etablissement
                                </Button>
                            </div>
                        )}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col space-y-4 mt-6">
                                    {navItems.map((item, index) => (
                                        <Link key={index} href={item.href} className="text-gray-700 hover:text-gray-900">
                                            {item.label}
                                        </Link>
                                    ))}
                                    <hr className="my-4" />
                                    {user ? (
                                        <>
                                            <Link href="/users/profil" className="flex items-center space-x-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{getLabelAvatar(user.username)}</AvatarFallback>
                                                </Avatar>
                                                <span>{user.username}</span>
                                            </Link>
                                            <Button variant="ghost" onClick={logOut}>
                                                {t("log_out")}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="ghost" onClick={() => router.push("/users/login")}>
                                                {t("login")}
                                            </Button>
                                            <Button variant="default" onClick={() => router.push("/users/register")}>
                                                {t("register")}
                                            </Button>
                                            <Button variant="outline" onClick={() => router.push("/users/etablissement/addEmail")}>
                                                + Add etablissement
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}

