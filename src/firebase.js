

import firebase from 'firebase/app';
import 'firebase/database';

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyDQVdxdIsABShrpHEy7tncNwO2P4uKNqkI",
    authDomain: "ev-test-5fa23.firebaseapp.com",
    databaseURL: "https://ev-test-5fa23-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ev-test-5fa23",
    storageBucket: "ev-test-5fa23.appspot.com",
    messagingSenderId: "894259655254",
    appId: "1:894259655254:web:bb089d85194747f4ea81f7",
};

// Firebase uygulaması başlatma
firebase.initializeApp(firebaseConfig);

// Firebase Realtime Database bağlantısı
export const db = firebase.database();