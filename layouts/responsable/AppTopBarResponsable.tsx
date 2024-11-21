import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import ResponsableLayoutContext from "../context/responsableLayoutContext";

interface User {
    username: string;
    job_post?: string;
    image?: string;
}

interface ResponsableLayoutContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

interface AppTopBarResponsableProps {
    style?: React.CSSProperties;
}

export default function AppTopBarResponsable({ style }: AppTopBarResponsableProps) {
    const { user } = useContext(ResponsableLayoutContext) as ResponsableLayoutContextType;
    // const router = useRouter();

    const getInitials = (str: string): string => {
        return str.length > 0 ? str.charAt(0).toUpperCase() : '';
    }

    return (
        <div style={style} className="w-full bg-white shadow-md fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-4 flex-1">
                        <Link href="/users" className="flex-shrink-0">
                            <Image
                                width={100}
                                height={106}
                                src="/images/logo-aftrip.png"
                                alt='logo'
                                className="h-10 w-auto"
                            />
                        </Link>
                        <div className="w-full max-w-xl">
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <svg
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.username}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                                        {getInitials(user.username)}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">
                                        {user.username}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {user.job_post}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}