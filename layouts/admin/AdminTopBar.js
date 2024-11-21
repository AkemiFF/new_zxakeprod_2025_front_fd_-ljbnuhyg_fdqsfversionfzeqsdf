import Link from 'next/link';
import style from './../../style/layouts/admin/AdminTopBar.module.css';
import { Image } from 'primereact/image';
import SideBarAdmin from './SideBarAdmin';
import { useContext, useEffect } from 'react';
import AdminLayoutContext from '../context/adminLayoutContext';
export default function AdminTopBar(){

    const {sideBar,setSideBar} = useContext(AdminLayoutContext);

    const changeSideBar = () =>{
        setSideBar(!sideBar);
    }



    return(
        <>
            <div className={style.container}>
                <div className={style.navbar}>
                    <button onClick={changeSideBar} className={style.button_menu} >
                        <i style={{fontSize:"25px"}} className="pi pi-bars"/>
                    </button>
                    <div className={style.nav_title}>
                        <Link className={style.nav_title_link} href={"/admin"}>
                            <Image width={60} height={61} src={"/images/logo-aftrip.png"} alt='logo'/>
                            <span>Admin</span>
                        </Link>
                    </div>
                </div>
            </div>
            <SideBarAdmin/>
        </>
    )
}