// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore/lite";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA32Z9xJPG6VbcxUWN-NX3rcn-pp2Gk5Hw",
    authDomain: "quizle-c06ef.firebaseapp.com",
    projectId: "quizle-c06ef",
    storageBucket: "quizle-c06ef.appspot.com",
    messagingSenderId: "915578182821",
    appId: "1:915578182821:web:dd3413812d1d69d21ac14c",
    measurementId: "G-HYSM0JR7HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const db = getFirestore(app);
export const authService = getAuth();
