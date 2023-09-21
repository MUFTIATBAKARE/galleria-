import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8TIS1V0B2cWDWdMMHFbrv9GyI2f_2fcE",
  authDomain: "galleria-87f42.firebaseapp.com",
  projectId: "galleria-87f42",
  storageBucket: "galleria-87f42.appspot.com",
  messagingSenderId: "319439106969",
  appId: "1:319439106969:web:97ff83084ce3148c00d908",
  measurementId: "G-S6Z3Z3GH48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
