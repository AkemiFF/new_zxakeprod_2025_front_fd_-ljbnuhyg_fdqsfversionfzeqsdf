import { getResponsableAccessToken, removeAccessResponsable } from "@/util/Cookies";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    username?: string;
    job_post?: string;
}

interface ResponsableLayoutContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    typeResponsable: number;
    setTypeResponsable: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with initial default values
const ResponsableLayoutContext = createContext<ResponsableLayoutContextType>({
    user: null,
    setUser: () => { },
    typeResponsable: 1,
    setTypeResponsable: () => { }
});

interface ResponsableLayoutProviderProps {
    children: ReactNode;
}

export const ResponsableLayoutProvider: React.FC<ResponsableLayoutProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [typeResponsable, setTypeResponsable] = useState<number>(1);

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
                console.error(error);
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
        localStorage.setItem('type_responsable', typeResponsable.toString());
    }, [typeResponsable]);

    const contextValue: ResponsableLayoutContextType = {
        user,
        setUser,
        typeResponsable,
        setTypeResponsable
    };

    return (
        <ResponsableLayoutContext.Provider value={contextValue}>
            {children}
        </ResponsableLayoutContext.Provider>
    );
};

// Custom hook to use the context
export const useResponsableLayout = () => {
    const context = useContext(ResponsableLayoutContext);
    if (context === undefined) {
        throw new Error('useResponsableLayout must be used within a ResponsableLayoutProvider');
    }
    return context;
};

export default ResponsableLayoutContext;