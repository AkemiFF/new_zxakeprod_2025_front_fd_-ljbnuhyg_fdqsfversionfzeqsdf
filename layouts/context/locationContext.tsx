import React, { createContext, ReactNode, useEffect, useState } from "react";

interface Location {
    // Define the structure of your location object here
    // For example:
    latitude: number;
    longitude: number;
}

interface LocationContextType {
    location: Location | null;
    setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
    children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<Location | null>(null);

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

