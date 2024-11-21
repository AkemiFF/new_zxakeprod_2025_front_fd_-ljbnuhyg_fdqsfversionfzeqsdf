import Head from "next/head";
import React from "react";
import style from '@/style/layouts/layout.module.css';
import AppFooter from "./AppFooter";
import AppTopbar from "./AppTopbar";

export default function Layout(props) {
    return(
        <React.Fragment>
            <Head>
                <meta charSet="UTF-8" />
            </Head>
            <AppTopbar/>
                <div className={style.container}>
                    {props.children}
                </div>
            <AppFooter/>
        </React.Fragment>
    )
}