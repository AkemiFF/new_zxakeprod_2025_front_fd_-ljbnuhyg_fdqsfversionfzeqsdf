const UrlConfig = {
    // apiBaseUrl: 'https://admin-server.craft-aftrip.com',
    apiBaseUrl: 'http://127.0.0.1:8000',
    // apiBaseUrl: 'http://192.168.88.57:8000',
    // apiBaseUrl: 'http://127.0.0.1:8000',
    adminUrl: '/admin',
}
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
export default UrlConfig;

export { UrlConfig, firebaseConfig };
