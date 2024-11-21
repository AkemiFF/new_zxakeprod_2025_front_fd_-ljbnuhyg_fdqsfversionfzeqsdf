import { createContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLocation = localStorage.getItem('location');
            if (savedLocation) {
                setLocation(JSON.parse(savedLocation));
            }
        }
    }, []);

    useEffect(() => {
        if (location) {
            localStorage.setItem('location', JSON.stringify(location));
        } else {
            localStorage.removeItem('location');
        }
    }, [location]);

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export default LocationContext;
