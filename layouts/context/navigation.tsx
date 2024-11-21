import React, { createContext, ReactNode, useContext, useState } from 'react';

interface NavigationContextType {
    canAccessForgotPage: boolean;
    setCanAccessForgotPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const [canAccessForgotPage, setCanAccessForgotPage] = useState(false);

    return (
        <NavigationContext.Provider value={{ canAccessForgotPage, setCanAccessForgotPage }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = (): NavigationContextType => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};
