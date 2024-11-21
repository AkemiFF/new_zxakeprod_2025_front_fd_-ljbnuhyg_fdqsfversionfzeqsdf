import style from '@/style/layouts/users/UserTopbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LayoutContext from './../context/layoutContext';
import { useContext, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import Cookies from 'js-cookie';
export default function UserTopbar() {
    const router = useRouter();
    const menu = useRef(null);
    const { user, setUser } = useContext(LayoutContext);
    const getLabelAvatar = (str) => {
        if (str.length > 0) {
            return str.charAt(0);
        }
        return '';
    }
    let items = [
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            command: () => {
                router.push("/users/profil");
            }
        },
        {
            label: 'Cart',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                router.push("/users/cart");
            }
        },
        {
            label: 'Responsable',
            icon: 'pi pi-fw pi-user-edit',
            command: () => {
                router.push("/responsable");
            }
        },
        {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            command: () => {
                router.push("/users/setting");
            }
        },
        {
            separator: true
        },
        {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: () => {
                logOut();
            }
        }
    ];
    const logOut = () => {

        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        setUser(null);
        router.push("/users/login");
    }
    return (
        <div className={style.container}>
            <div className={style.navbar}>
                <div className={style.nav_title}>
                    <Link href={"/users"}>
                        <Image width={50} height={53} src={"/images/logo-aftrip.png"} alt='logo' />
                    </Link>
                </div>
                {
                    user != null && (
                        <>
                            <div aria-controls="popup_menu_right" aria-haspopup onClick={(event) => menu.current.toggle(event)} className={style.user_container}>
                                <Avatar
                                    label={getLabelAvatar(user.username)}
                                    shape='circle'
                                    className={style.username_image}
                                    image={user.userImage}
                                />
                                <span className={style.username}>{user.username}</span>
                            </div>
                            <Menu
                                className={style.menu}
                                id="popup_menu_right"
                                popupAlignment="right"
                                ref={menu}
                                model={items}
                                popup
                                pt={{
                                    label: { className: style.menu_item },
                                    icon: { className: style.menu_item },
                                    menuitem: { className: style.menu_item_container }
                                }}
                            />
                        </>
                    )
                }
            </div>
        </div>
    );
}