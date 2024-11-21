import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from 'react';
import { getCsrfTokenDirect } from "@/util/csrf";
import { UrlConfig } from "@/util/config";
import { Toast } from 'primereact/toast';
import style from '@/style/components/button/GoogleButton.module.css';
import { Button } from "primereact/button";
import { useContext } from "react";
import LayoutContext from "@/layouts/context/layoutContext";
import { firebaseConfig } from '@/util/config'
import { setTokensInCookies } from "@/util/Cookies";

const setCookieWithExpiry = (name, value, days, secure = true, sameSite = 'Strict') => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    Cookies.set(name, value, {
        expires: date,
        secure: secure,
        sameSite: sameSite
    });
};

const verifyUserInfo = (firebaseInfoUser, setIsLoggedIn, toast, setUser) => {

    try {
        const csrfToken = getCsrfTokenDirect();
        fetch(`${UrlConfig.apiBaseUrl}/api/accounts/client/loginwithemail/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify({ email: firebaseInfoUser.email }),
        })
            .then(response => response.json()
                .then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status !== 200) {
                    const errorMessage = status === 404
                        ? 'Email incorrect ou n\'existe pas'
                        : 'Erreur de connexion';
                    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 5000 });
                    return;
                }

                setCookieWithExpiry("csrfToken", csrfToken, 5);
                setTokensInCookies(
                    body.refresh, body.access
                )

                const info = localStorage.getItem("user_register_info");
                if (info) {
                    const parsedInfo = JSON.parse(info);
                    setUser({
                        username: body.username,
                        id: body.id,
                        userImage: UrlConfig.apiBaseUrl + body.profilPic,
                    });
                    Cookies.set("profile_user", body.profilPic, { expires: 1, secure: true, sameSite: 'Strict' });
                    Cookies.set("username", parsedInfo.displayName, { expires: 1, secure: true, sameSite: 'Strict' });

                }

                localStorage.removeItem("user_register_info");

                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Connexion réussie', life: 2000 });
                setIsLoggedIn(true);
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            })
            .catch(error => {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erreur de connexion', life: 2000 });
                console.error(error);
            });
    } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erreur de connexion', life: 2000 });
        console.error(error);
    }
};

export default function GoogleLoginButton() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const { user, setUser } = useContext(LayoutContext);

    const toast = useRef(null);

    const app = initializeApp(firebaseConfig);

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        const auth = getAuth(app);
        auth.languageCode = 'fr';
        provider.setCustomParameters({ 'login_hint': 'user@example.com' });

        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                localStorage.setItem("user_register_info", JSON.stringify(user));
                setUserInfo({
                    displayName: user.displayName || '',
                    email: user.email || '',
                    photoURL: user.photoURL || '',
                    providerData: user.providerData
                });
            })
            .catch(error => {
                console.error("Error Code: ", error.code);
                console.error("Error Message: ", error.message);
            });
    };

    useEffect(() => {
        const info = localStorage.getItem("user_register_info");
        if (info) {
            setUserInfo(JSON.parse(info));
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
            verifyUserInfo(userInfo, setIsLoggedIn, toast, setUser);
        }
    }, [userInfo, setUser]);

    return (
        <>
            <Button className={style.button_container} onClick={handleSignIn}>
                <Image width={25} height={25} alt="G" src="/images/google.png" />
                Log in with Google
            </Button>
            <Toast ref={toast} />
        </>
    );
}
