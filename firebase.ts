import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5PzaZNeTQim0fKw20u4BJcHpX5npxpfk",
  authDomain: "e-commerce-1f458.firebaseapp.com",
  projectId: "e-commerce-1f458",
  storageBucket: "e-commerce-1f458.appspot.com",
  messagingSenderId: "278680883412",
  appId: "1:278680883412:web:16e852c23a7d9c96c7ab41"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
