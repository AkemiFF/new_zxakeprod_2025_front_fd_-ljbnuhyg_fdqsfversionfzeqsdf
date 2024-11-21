"use client"
import { createContext, useEffect, useState } from "react";

const AdminLayoutContext = createContext();

// export const AdminLayoutProvider = ({ children }) => {

//     const [sideBar, setSideBar] = useState(false);

//     const [user, setUser] = useState(null);

//     return <AdminLayoutContext.Provider value={{ sideBar, setSideBar, user, setUser }}>{children}</AdminLayoutContext.Provider>
// }

export const AdminLayoutProvider = ({ children }) => {

    const [sideBar, setSideBar] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('adminUser');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('adminUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('adminUser');
        }
    }, [user]);

    return (
        <AdminLayoutContext.Provider value={{ sideBar, setSideBar, user, setUser }}>
            {children}
        </AdminLayoutContext.Provider>
    );
};


export default AdminLayoutContext;


