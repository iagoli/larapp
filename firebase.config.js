// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf9amUlNnfa5_EAKZIPv4JAQMp1Qi9vno",
  authDomain: "cgroup46-aec4b.firebaseapp.com",
  projectId: "cgroup46-aec4b",
  storageBucket: "cgroup46-aec4b.firebasestorage.app",
  messagingSenderId: "71621925828",
  appId: "1:71621925828:web:12940fa33c9ff740ec6291"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, db }