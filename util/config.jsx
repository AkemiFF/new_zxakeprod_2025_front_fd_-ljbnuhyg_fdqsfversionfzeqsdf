
const apikey = process.env.NEXT_PUBLIC_GOOGLE_API_FIREBASE;
const auth_domain = process.env.NEXT_PUBLIC_GOOGLE_FIREBASE_AUTHDOMAIN;

const firebaseConfig = {
    apiKey: apikey,
    authDomain: auth_domain,
    projectId: "test-ce224",
    storageBucket: "test-ce224.appspot.com",
    messagingSenderId: "758626351874",
    appId: "1:758626351874:web:4e0e954eb74dde33c3a01b",
    measurementId: "G-9B4HNZLJ79",
};

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_BASE_URL = 'http://localhost:8000';
export default API_BASE_URL;
export { API_BASE_URL, firebaseConfig };
