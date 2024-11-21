import { useState } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
    const [authTokens, setAuthTokens] = useState(null);

    const setTokens = (tokens) => {
        if (tokens.access) {
            Cookies.set('access_token', tokens.access, { expires: 7, secure: true, sameSite: 'strict' });
        }
        if (tokens.refresh) {
            Cookies.set('refresh_token', tokens.refresh, { expires: 30, secure: true, sameSite: 'strict' });
        }
        setAuthTokens(tokens);
    };

    const logout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        setAuthTokens(null);
    };

    return {
        authTokens,
        setAuthTokens: setTokens,
        logout,
    };
}
