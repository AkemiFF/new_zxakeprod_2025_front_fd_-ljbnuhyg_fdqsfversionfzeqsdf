import Link from 'next/link';
import style from './../../style/layouts/admin/SideBarAdmin.module.css';
import { useContext, useState } from 'react';
import AdminLayoutContext from '../context/adminLayoutContext';
import { useRouter } from 'next/router';
import { removeAllAdminAccess } from '@/util/Cookies';
import { Divider } from 'primereact/divider';
export default function SideBarAdmin(props) {

    const { sideBar } = useContext(AdminLayoutContext);
    const { setUser } = useContext(AdminLayoutContext);
    const router = useRouter();

    const logOut = () => {
        setUser(null);
        removeAllAdminAccess();
        router.push("/admin/login");
    }

    return (
        <div className={sideBar == true ? style.container_mini : style.container}>
            <Link className={style.container_link} href={"/admin"}>
                <i className='pi pi-building' />
                <span className={style.link}>DashBoard</span>
                <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
            </Link>
            <Divider></Divider>
            <Link className={style.container_link} href={"/admin/accommodation"}>
                <i className='pi pi-building' />
                <span className={style.link}>Accommodation</span>
                <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
            </Link>
            <Link className={style.container_link} href={"/admin/handcraft"}>
                <i className='pi pi-shopping-bag' />
                <span className={style.link}>Hancraft</span>
                <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
            </Link>
            <Link className={style.container_link} href={"/admin/trip"}>
                <i className='pi pi-compass' />
                <span className={style.link}>Trip</span>
                <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
            </Link>
            <Link className={style.container_link} href={"/admin/users"}>
                <i className='pi pi-user' />
                <span className={style.link}>Users</span>
                <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
            </Link>
            <Link className={style.container_link} href={""}>
                <i className='pi pi-envelope' />
                <span className={style.link}>Messages</span>
                <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
            </Link>

            <div className={style.bottom}>
                <Link className={style.container_link} href={""}>
                    <i className='pi pi-cog' />
                    <span className={style.link}>Setting</span>
                    <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
                </Link>
                <div onClick={logOut} className={style.container_link_out} href={""}>
                    <i className='pi pi-sign-out' />
                    <span className={style.link}>Log out</span>
                    <i style={{ display: sideBar == true ? "none" : "block" }} className='pi pi-chevron-right' />
                </div>
            </div>
        </div>
    )
}