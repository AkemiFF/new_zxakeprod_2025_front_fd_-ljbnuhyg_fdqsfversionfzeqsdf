import Head from "next/head";
import AdminTopBar from "./AdminTopBar";
import style from './../../style/layouts/admin/AdminLayout.module.css';
import AdminLayoutContext from "../context/adminLayoutContext";
import { useContext } from "react";
export default function AdminLayout(props){
    
    const {sideBar} = useContext(AdminLayoutContext);

    return(
        <>
            <Head>
                <title>Admin</title>
                <meta charSet="UTF-8" />
            </Head>
            <AdminTopBar/>
            <div className={sideBar==true ? style.container_mini : style.container}>
                {props.children}
            </div>
        </>
    )
}