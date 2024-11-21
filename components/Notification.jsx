
import React, { useRef, useState } from 'react';
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
// import { Button } from 'primereact/button';
import style from "@/style/components/NotificationTemplate.module.css"
export default function NotificationTemplate({ notification }) {
    const configMenu = useRef(null);
    const [isTogglerEnabled, setIsTogglerEnabled] = useState(false);
    const items = [
        {
            label: 'Refresh',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Search',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;
        options.collapsed = false
        console.log(options.onTogglerClick);
        return (
            <div className={className}>
                <div className={style.header}>
                    <Avatar image="/images/admin.png" size="large" shape="circle" />
                    <span className="font-bold">Admin</span>
                </div>
                <div>
                    <Menu model={items} popup ref={configMenu} id="config_menu" />
                    <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                        <span className="pi pi-cog"></span>
                    </button>
                    {options.togglerElement}
                </div>
            </div>
        );
    };
    
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return `${date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    };
    const footerTemplate = (options) => {
        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

        return (
            <div className={className}>
                {/* <div className="flex align-items-center gap-2">
                    <Button icon="pi pi-user" rounded text></Button>
                    <Button icon="pi pi-bookmark" severity="secondary" rounded text></Button>
                </div> */}
                <span className={style.footer_notification}>{formatDate(notification.date_created)}</span>
            </div>
        );
    };

    return (
        <Panel headerTemplate={headerTemplate} footerTemplate={footerTemplate} toggleable={true} >
            <p className="m-0">
                {notification.message}
            </p>
        </Panel>
    )
}
