import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore'
import {
    getAuth
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCMiy1xPfHum60vhz8qD44sc6aqIDKVusI",
    authDomain: "e-doukoukai-next.firebaseapp.com",
    projectId: "e-doukoukai-next",
    storageBucket: "e-doukoukai-next.appspot.com",
    messagingSenderId: "850946452120",
    appId: "1:850946452120:web:7cacaadc3d942a1a8bbeed",
    measurementId: "G-G12K88FEQC"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var firestore = getFirestore(app)
var auth = getAuth(app)
const analytics = getAnalytics(app);

//サーバーサイドでレンダリングするときのエラーを避ける
if (typeof window !== "undefined" && !getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth();
    firestore = getFirestore();
}

export { auth }