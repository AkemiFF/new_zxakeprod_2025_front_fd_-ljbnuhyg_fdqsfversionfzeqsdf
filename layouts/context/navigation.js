import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [canAccessForgotPage, setCanAccessForgotPage] = useState(false);

    return (
        <NavigationContext.Provider value={{ canAccessForgotPage, setCanAccessForgotPage }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    return useContext(NavigationContext);
};
