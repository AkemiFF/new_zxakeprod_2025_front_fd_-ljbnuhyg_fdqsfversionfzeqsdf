import { getResponsableAccessToken, removeAccessResponsable } from "@/util/Cookies";
import { createContext, useEffect, useState } from "react";

const ResponsableLayoutContext = createContext();

export const ResponsableLayoutProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [typeResponsable, setTypeResponsable] = useState(1);

    useEffect(() => {
        const savedUser = localStorage.getItem('responsable_user');
        const savedTypeResponsable = localStorage.getItem('type_responsable');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedTypeResponsable) {
            setTypeResponsable(parseInt(savedTypeResponsable, 10));
        }
    }, []);
    useEffect(() => {
        const checkAccessToken = async () => {
            try {
                const token = await getResponsableAccessToken();
                if (!token) {
                    handleLogout();
                }
            } catch (error) {
                handleLogout();
            }
        };

        checkAccessToken();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('responsable_user');
        localStorage.removeItem('type_responsable');
        setUser(null);
        removeAccessResponsable();
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('responsable_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('responsable_user');
            localStorage.removeItem('type_responsable');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('type_responsable', typeResponsable);
    }, [typeResponsable]);

    return (
        <ResponsableLayoutContext.Provider
            value={{ user, setUser, typeResponsable, setTypeResponsable }}
        >
            {children}
        </ResponsableLayoutContext.Provider>
    );
};

export default ResponsableLayoutContext;
