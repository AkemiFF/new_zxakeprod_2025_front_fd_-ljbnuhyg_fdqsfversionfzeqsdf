import Cookies from 'js-cookie';
import UrlConfig from './config';
import { getNewAccess } from './Cookies';
import { getCsrfTokenDirect } from './csrf';


const FetchUser = () => {
    let access = Cookies.get('accessToken');
    
    const handleFetch = (accessToken) => {
        return fetch(`${UrlConfig.apiBaseUrl}/api/accounts/profil-client/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error('Error during user fetch operation: ' + (errorData.error || 'Unknown error'));
                    });
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Error during user fetch operation:', error);
                return null;
            });
    };

    if (!access) {
        return getNewAccess()
            .then(() => {
                access = Cookies.get('accessToken');
                if (!access) {
                    console.error('No access token available');
                    return null;
                }
                return handleFetch(access);
            })
            .catch((error) => {
                console.error('Error fetching new access token:', error);
                return null;
            });
    }

    return handleFetch(access);
};

const addToCart = async (produitId, quantite) => {
    // Vérifie si le token d'accès est disponible
    let access = Cookies.get('accessToken');

    if (!access) {
        try {
            // Si le token n'est pas disponible, essayez d'obtenir un nouveau token
            await getNewAccess();
            access = Cookies.get('accessToken');
            if (!access) {
                console.error('No access token available');
                return false;
            }
        } catch (error) {
            console.error('Error fetching new access token:', error);
            return false;
        }
    }

    try {
        // Effectue la requête pour ajouter le produit au panier
        const response = await fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/panier/ajouter/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
            },
            body: JSON.stringify({ produit_id: produitId, quantite }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erreur lors de l'ajout au panier.");
        }

        const data = await response.json();
        console.log('Produit ajouté au panier :', data);
        return data;

    } catch (error) {
        console.error("Erreur lors de l'ajout au panier :", error);
        return null;
    }
};


export default addToCart;
export { FetchUser };