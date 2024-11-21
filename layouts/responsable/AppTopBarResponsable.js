import { useContext, useRef } from "react"
import ResponsableLayoutContext from "../context/responsableLayoutContext"
import { useRouter } from "next/router";
import style from '@/style/layouts/responsable/AppTopBarResponsable.module.css';
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import Link from "next/link";
import Image from "next/image";
export default function AppTopBarResponsable(props) {

    const { user, setUser } = useContext(ResponsableLayoutContext);
    const router = useRouter();


    const getLabelAvatar = (str) => {
        if (str.length > 0) {
            return str.charAt(0);
        }
        return '';
    }
    let items = [];

    return (
        <div style={props.style} className={style.container}>
            <div className={style.navbar}>
                <div className={style.nav_title}>
                    <Link href={"/users"}>
                        <Image width={100} height={106} src={"/images/logo-aftrip.png"} alt='logo' />
                    </Link>
                    <div className={style.search_contaner}>
                        <input type="search" placeholder="Search" className={style.input_search} />
                    </div>
                </div>
                <div className={style.right_container}>
                    <div className={style.user_container}>
                        <Avatar
                            label={user != null && user.username != null && getLabelAvatar(user.username)}
                            shape='circle'
                            className={style.username_image}
                        />
                        <div className={style.user}>
                            <span className={style.username}>{user != null && user.username != null && user.username}</span>
                            <span className={style.job}>{user != null && user.job_post != null && user.job_post}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}