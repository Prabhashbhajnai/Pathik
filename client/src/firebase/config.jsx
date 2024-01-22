// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDD-p9pHxNZAC50d2sHRGJSHWS2PWjdkLE",
    authDomain: "pathik-468f4.firebaseapp.com",
    projectId: "pathik-468f4",
    storageBucket: "pathik-468f4.appspot.com",
    messagingSenderId: "671291852788",
    appId: "1:671291852788:web:60cefd3868fb6c9bcc9ba1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();