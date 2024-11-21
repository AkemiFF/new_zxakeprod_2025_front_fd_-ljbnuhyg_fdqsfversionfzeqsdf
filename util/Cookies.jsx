import Cookies from 'js-cookie';
import { UrlConfig } from './config';

/**
 * Enregistre les tokens dans les cookies de manière sécurisée.
 * @param {string} refreshToken - Le token de rafraîchissement.
 * @param {string} accessToken - Le token d'accès.
 */
const setTokensInCookies = (refreshToken, accessToken) => {
    Cookies.set('refreshToken', refreshToken, {
        expires: 1,
        secure: true,
        sameSite: 'Strict'
    });

    Cookies.set('trucdu_genre', accessToken, {
        expires: 5 / 1440,
        secure: true,
        sameSite: 'Strict'
    });
    Cookies.set('accessToken', accessToken, {
        expires: 5 / 1440,
        secure: true,
        sameSite: 'Strict'
    });
    return true
};

function removeAllAdminAccess() {
    const accessToken = Cookies.get('isthisanotherpaimon');

    if (accessToken) {
        Cookies.remove('isthisanotherpaimon', { secure: true, sameSite: 'strict' });
    }

    const refreshToken = Cookies.get('yesthisisanotherpaimon');

    if (refreshToken) {
        Cookies.remove('yesthisisanotherpaimon', { secure: true, sameSite: 'strict' });
    }

    localStorage.removeItem('adminUser');
}
function removeAccessClient() {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
        Cookies.remove('accessToken', { secure: true, sameSite: 'strict' });
    }

    const refreshToken = Cookies.get('refreshToken');

    if (refreshToken) {
        Cookies.remove('refreshToken', { secure: true, sameSite: 'strict' });
    }

    localStorage.removeItem('clientUser');
}
function removeAccessResponsable() {
    const accessToken = Cookies.get('responsable_access_token');

    if (accessToken) {
        Cookies.remove('responsable_access_token', { secure: true, sameSite: 'strict' });
    }

    const refreshToken = Cookies.get('responsable_refresh_token');

    if (refreshToken) {
        Cookies.remove('responsable_refresh_token', { secure: true, sameSite: 'strict' });
    }

    localStorage.removeItem('responsable_user');
}

function getAccessAdmin() {
    const accessToken = Cookies.get('isthisanotherpaimon');

    if (accessToken) {
        return Promise.resolve(accessToken);
    } else {
        return getNewAdminAccess()
            .then(() => {
                const accessToken = Cookies.get('isthisanotherpaimon');

                return Promise.resolve(accessToken);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération du token:", error);
                return null;
            });
    }
}

const getNewAdminAccess = () => {
    const refreshToken = Cookies.get('yesthisisanotherpaimon');

    if (!refreshToken) {
        console.error('No refresh token found in cookies');
        return Promise.reject('No refresh token found in cookies');
    }

    return fetch(`${UrlConfig.apiBaseUrl}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then(data => {
            const { access } = data;

            Cookies.set('isthisanotherpaimon', access, {
                expires: 5 / 1440,
                secure: true,
                sameSite: 'Strict'
            });
            return data.access;
        })
        .catch(error => {
            // console.error('Error while refreshing access token:', error);
        });
};

const getClientAccess = async () => {
    let token = Cookies.get("accessToken");

    if (!token) {
        // console.log("No access token found, trying to refresh...");
        await getNewAccess();
        token = Cookies.get("accessToken");
    }

    if (!token) {
        // console.error("Failed to obtain access token");
        return false;
    }


    return token;
}
const getNewAccess = () => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
        // console.error('No refresh token found in cookies');
        return Promise.reject('No refresh token found in cookies');
    }

    return fetch(`${UrlConfig.apiBaseUrl}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then(data => {
            const { access } = data;

            Cookies.set('accessToken', access, {
                expires: 5 / 1440,
                secure: true,
                sameSite: 'Strict'
            });
        })
        .catch(error => {
            // console.error('Error while refreshing access token:', error);
        });
};



const customLogin = async (email, password) => {
    try {
        const response = await fetch(`${UrlConfig.apiBaseUrl}/api/accounts/client/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            let message;
            if (response.status === 404) {
                message = "Email unknown";
            } else if (response.status === 401) {
                message = "Wrong password";
            } else {
                message = "An error occurred";
            }
            throw new Error(message);
        }

        const data = await response.json();

        if (data.refresh && data.access) {
            const cook = setTokensInCookies(data.refresh, data.access);
            if (cook) {
                return data; // Retourner les données si tout va bien
            } else {
                throw new Error("Failed to set cookies");
            }
        } else {
            throw new Error("Missing authentication tokens");
        }
    } catch (error) {
        console.error(error);
        throw error; // Relancer l'erreur pour la gérer en dehors de cette fonction
    }
};

const getNewResponsabeAccess = async () => {
    const refreshToken = Cookies.get('responsable_refresh_token');

    if (!refreshToken) {
        console.error('No refresh token found in cookies');
        return Promise.reject('No refresh token found in cookies');
    }

    return fetch(`${UrlConfig.apiBaseUrl}/api/token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then(data => {
            const { access } = data;
            Cookies.set('responsable_access_token', access, {
                expires: 5 / 1440,
                secure: true,
                sameSite: 'Strict'
            });
            return access;
        })
        .catch(error => {
            console.error('Error while refreshing access token:', error);
            throw error;
        });
};

// function getResponsableAccessTokeno() {
//     const accessToken = Cookies.get('responsable_access_token');


//     if (accessToken) {
//         return accessToken;
//     }


//     getNewResponsabeAccess().then(() => {
//         const newAccessToken = Cookies.get('responsable_access_token');
//         if (newAccessToken) {
//             return newAccessToken;
//         } else {
//             console.error('Failed to retrieve new access token.');
//             return null;
//         }
//     }).catch(error => {
//         console.error(error);
//         return null;
//     });
// }


const getResponsableAccessToken = async () => {
    let token = Cookies.get("responsable_access_token");

    if (!token) {
        // console.log("No access token found, trying to refresh...");
        await getNewResponsabeAccess();
        token = Cookies.get("responsable_access_token");
    }

    if (!token) {
        // console.error("Failed to obtain access token");
        return false;
    }


    return token;
}

export { setTokensInCookies, getClientAccess, removeAccessResponsable, removeAccessClient, customLogin, getNewAccess, getResponsableAccessToken, removeAllAdminAccess, getNewResponsabeAccess, getAccessAdmin, getNewAdminAccess };
