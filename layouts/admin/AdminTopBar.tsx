import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import AdminLayoutContext from '../context/adminLayoutContext';
import SideBarAdmin from './SideBarAdmin';

export default function AdminTopBar() {
    const { sideBar, setSideBar } = useContext(AdminLayoutContext);

    const changeSideBar = () => {
        setSideBar(!sideBar);
    };

    return (
        <>
            <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center justify-between px-4 py-2">
                    <button
                        onClick={changeSideBar}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <Link href="/admin" className="flex items-center space-x-2">
                        <Image width={60} height={61} src="/images/logo-aftrip.png" alt="logo" />
                        <span className="text-xl font-semibold">Admin</span>
                    </Link>
                </div>
            </div>
            <SideBarAdmin />
        </>
    );
}

