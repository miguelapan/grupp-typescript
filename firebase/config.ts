import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCHKRi5Oi3j-J1cQp4sTe9NLHF3y25sBsA",
  authDomain: "grupp-typescript.firebaseapp.com",
  projectId: "grupp-typescript",
  storageBucket: "grupp-typescript.appspot.com",
  messagingSenderId: "1029962554246",
  appId: "1:1029962554246:web:d99a0ad5bc043c18e86a07"
};

const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);


export { app, db };