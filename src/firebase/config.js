// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyA6-o9W05omZGdfmEr1V6_KbyaFp3unMgk",
  authDomain: "couchsurfconnect-1cf30.firebaseapp.com",
  projectId: "couchsurfconnect-1cf30",
  storageBucket: "couchsurfconnect-1cf30.appspot.com",
  messagingSenderId: "667030596580",
  appId: "1:667030596580:web:532a0bc4064327087eb5f1",
  measurementId: "G-29XLG2R7BT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
