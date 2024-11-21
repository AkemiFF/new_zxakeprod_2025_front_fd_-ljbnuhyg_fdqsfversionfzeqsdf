import { removeAllAdminAccess } from '@/util/Cookies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AdminLayoutContext from '../context/adminLayoutContext';

export default function SideBarAdmin() {
    const { sideBar, setUser } = useContext(AdminLayoutContext);
    const router = useRouter();

    const logOut = () => {
        setUser(null);
        removeAllAdminAccess();
        router.push("/admin/login");
    };

    const menuItems = [
        { href: "/admin", icon: "home", label: "Dashboard" },
        { href: "/admin/accommodation", icon: "office-building", label: "Accommodation" },
        { href: "/admin/handcraft", icon: "shopping-bag", label: "Handcraft" },
        { href: "/admin/trip", icon: "globe", label: "Trip" },
        { href: "/admin/users", icon: "user", label: "Users" },
        { href: "", icon: "mail", label: "Messages" },
    ];

    return (
        <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${sideBar ? 'w-20' : 'w-64'}`}>
            <div className="flex flex-col h-full">
                <div className="flex-grow py-4">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.href} className="flex items-center px-4 py-2 hover:bg-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {!sideBar && <span className="ml-2">{item.label}</span>}
                        </Link>
                    ))}
                </div>
                <div className="py-4">
                    <Link href="" className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {!sideBar && <span className="ml-2">Setting</span>}
                    </Link>
                    <button onClick={logOut} className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {!sideBar && <span className="ml-2">Log out</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}

