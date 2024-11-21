"use client"
import { getClientAccess } from "@/util/Cookies";
import { createContext, useEffect, useState } from "react";
import '../../util/i18n';
import i18n from "../../util/i18n";

const LayoutContext = createContext();



export const LayoutProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState("en");

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('user');
            const savedLang = localStorage.getItem('lang');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
            if (savedLang) {
                setLang(savedLang);
                i18n.changeLanguage(savedLang);
            }
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        const checkAccessToken = async () => {
            try {
                const token = await getClientAccess();
                if (!token) {
                    localStorage.removeItem('user');
                    setUser(null);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {

                localStorage.removeItem('user');
                setUser(null);
            }
        };

        checkAccessToken();
    }, []);
    useEffect(() => {
        if (lang) {
            localStorage.setItem('lang', lang);
        }
    }, [lang]);

    return (
        <LayoutContext.Provider value={{ user, setUser, lang, setLang }}>
            {children}
        </LayoutContext.Provider>
    );
};
export default LayoutContext;


