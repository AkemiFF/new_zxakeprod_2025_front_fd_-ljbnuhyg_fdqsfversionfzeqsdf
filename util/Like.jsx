
import Cookies from "js-cookie";
import { getNewAccess } from "./Cookies";

const LikeProduct = async (idProduct) => {
    let access = Cookies.get('accessToken');

    // Fonction pour gérer le "like"
    const handleLikeOperation = async (accessToken) => {
        return fetch(`${UrlConfig}/api/artisanat/produit/${idProduct}/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error('Error during like operation: ' + (errorData.error || 'Unknown error'));
                    });
                }
                return response.json();
            })
            .then(data => {

                const liked = data.message.includes('ajouté');

                if (liked) {
                    console.log(data.message);

                    return true;

                }
                else {
                    console.log(data.message);

                    return false;
                }
                // return liked;
            })
            .catch(error => {
                console.error('Error during like operation:', error);
                return false; // En cas d'erreur, retourner false
            });
    };

    if (!access) {
        try {
            await getNewAccess();
            access = Cookies.get('accessToken');
            if (!access) {
                console.error('No access token available');
                return false; // Aucun token d'accès disponible
            }
        } catch (error) {
            console.error('Error fetching new access token:', error);
            return false; // En cas d'erreur, retourner false
        }
    }
    return await handleLikeOperation(access);
};


const LikeAccomodation = async (idAccomodation) => {
    let access = Cookies.get('accessToken');

    const handleLikeOperation = async (accessToken) => {
        return fetch(`${UrlConfig}/api/hebergement/${idAccomodation}/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error('Error during like operation: ' + (errorData.error || 'Unknown error'));
                }
                return response.json();
            })
            .then(data => {

                const liked = data.message.includes('ajouté');

                if (liked) {
                    console.log(data.message);

                    return true;

                }
                else {
                    console.log(data.message);

                    return false;
                }
                // return liked;
            })
            .catch(error => {
                console.error('Error during like operation:', error);
                return false;
            });
    };

    if (!access) {
        try {
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
    return await handleLikeOperation(access);
};
const checkIfClientLikedProduct = (produitId) => {
    return getNewAccess()
        .then(() => {
            let access = Cookies.get('accessToken');

            if (!access) {
                return getNewAccess()
                    .then(() => {
                        access = Cookies.get('accessToken');
                        if (!access) {
                            console.error('No access token available');
                            return false;
                        }
                        return access;
                    })
                    .catch(error => {
                        console.error('Error fetching new access token:', error);
                        return false;
                    });
            }
            return access;
        })
        .then(access => {
            if (!access) return false;

            return fetch(`${UrlConfig}/api/artisanat/produits/${produitId}/liked/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error('Failed to check if product is liked: ' + (errorData.error || 'Unknown error'));
                        });
                    }
                    return response.json();
                })
                .then(data => data.liked)
                .catch(error => {
                    console.error('Error checking like status:', error);
                    return false;
                });
        })
        .catch(error => {
            console.error('Error in initial access token request:', error);
            return false;
        });
};
const checkIfClientLikedAccomodation = async (produitId) => {
    return getNewAccess()
        .then(() => {
            let access = Cookies.get('accessToken');

            if (!access) {
                return getNewAccess()
                    .then(() => {
                        access = Cookies.get('accessToken');
                        if (!access) {
                            console.error('No access token available');
                            return false;
                        }
                        return access;
                    })
                    .catch(error => {
                        console.error('Error fetching new access token:', error);
                        return false;
                    });
            }
            return access;
        })
        .then(access => {
            if (!access) return false;

            return fetch(`${UrlConfig}/api/hebergement/${produitId}/liked/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            throw new Error('Failed to check if product is liked: ' + (errorData.error || 'Unknown error'));
                        });
                    }
                    return response.json();
                })
                .then(data => data.liked)
                .catch(error => {
                    console.error('Error checking like status:', error);
                    return false;
                });
        })
        .catch(error => {
            console.error('Error in initial access token request:', error);
            return false;
        });
};

// Export functions (Toast reference needs to be used in a component)
export { checkIfClientLikedAccomodation, checkIfClientLikedProduct, LikeAccomodation, LikeProduct };

