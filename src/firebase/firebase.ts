// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT3TRxfrEbjDqnyQgXBeWjIzOeEBLa6rI",
  authDomain: "courese-nhan.firebaseapp.com",
  projectId: "courese-nhan",
  storageBucket: "courese-nhan.appspot.com",
  messagingSenderId: "281205795622",
  appId: "1:281205795622:web:c243f07f0432aa9952efe7",
  measurementId: "G-ZND6E75SKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
