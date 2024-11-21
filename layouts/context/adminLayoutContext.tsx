import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
}

interface AdminLayoutContextType {
    sideBar: boolean;
    setSideBar: (value: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

const defaultContext: AdminLayoutContextType = {
    sideBar: false,
    setSideBar: () => { },
    user: null,
    setUser: () => { }
};

const AdminLayoutContext = createContext<AdminLayoutContextType>(defaultContext);

interface AdminLayoutProviderProps {
    children: ReactNode;
}

export const AdminLayoutProvider: React.FC<AdminLayoutProviderProps> = ({ children }) => {
    const [sideBar, setSideBar] = useState(false);
    const [user, setUser] = useState<User | null>(null);

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

    const contextValue: AdminLayoutContextType = {
        sideBar,
        setSideBar,
        user,
        setUser
    };

    return (
        <AdminLayoutContext.Provider value={contextValue}>
            {children}
        </AdminLayoutContext.Provider>
    );
};

export const useAdminLayout = () => {
    const context = useContext(AdminLayoutContext);
    if (!context) {
        throw new Error('useAdminLayout must be used within an AdminLayoutProvider');
    }
    return context;
};

export default AdminLayoutContext;