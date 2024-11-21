import Head from "next/head";
import { ReactNode, useContext } from "react";
import AdminLayoutContext from "../context/adminLayoutContext";
import AdminTopBar from "./AdminTopBar";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { sideBar } = useContext(AdminLayoutContext);

    return (
        <>
            <Head>
                <title>Admin</title>
                <meta charSet="UTF-8" />
            </Head>
            <AdminTopBar />
            <div className={`p-4 ${sideBar ? 'ml-20' : 'ml-64'} transition-all duration-300 ease-in-out`}>
                {children}
            </div>
        </>
    );
}
