import Cookies from "js-cookie";
import { UrlConfig } from "./config";
import { useContext } from "react";
import LayoutContext from "@/layouts/context/layoutContext";
import { setTokensInCookies } from "./Cookies";





export const getCsrfFromToken = async () => {
    try {
        const response = await fetch(`${UrlConfig.apiBaseUrl}/api/get-csrf-token-direct/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get CSRF token');
        }

        const data = await response.json();
        // console.log("CSRF token set:", data);
        return data.csrfToken;
    } catch (error) {
        // console.error("Error fetching CSRF token:", error.message);
        throw error;
    }
};


export const custom_login = (username, password) => {
    const url = `${UrlConfig.apiBaseUrl}/api/token/`;
    const csrfToken = getCsrfTokenDirect();


    const data = {
        username: username,
        password: password
    };


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(responseData => {
            setTokensInCookies(responseData.refresh, responseData.access);

            return responseData;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}


export const getCsrfTokenDirect = async () => {
    try {
        const response = await fetch(`${UrlConfig.apiBaseUrl}/api/get-csrf-token-direct/`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",

            },
        });

        if (!response.ok) {
            throw new Error('Failed to get CSRF token');
        }

        const data = await response.json();
        return data.csrfToken;

    } catch (error) {
        console.error("Error fetching CSRF token:", error.message);
        throw error;
    }
};