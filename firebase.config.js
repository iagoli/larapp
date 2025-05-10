import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export { app, db };
