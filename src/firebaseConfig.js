import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAoQaCUz03Iom6gy11KUrgs4BKEdSNpgKQ",
    authDomain: "first-project-39477.firebaseapp.com",
    projectId: "first-project-39477",
    storageBucket: "first-project-39477.appspot.com",
    messagingSenderId: "427352669172",
    appId: "1:427352669172:web:0b7e6f803e5408eff1d7a1",
    measurementId: "G-7JJF02V75E"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth=firebase.auth();
  const db = firebaseApp.firestore();
   
  export {auth , db} 


// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"
// import { getAuth , signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAoQaCUz03Iom6gy11KUrgs4BKEdSNpgKQ",
//   authDomain: "first-project-39477.firebaseapp.com",
//   projectId: "first-project-39477",
//   storageBucket: "first-project-39477.appspot.com",
//   messagingSenderId: "427352669172",
//   appId: "1:427352669172:web:0b7e6f803e5408eff1d7a1",
//   measurementId: "G-21JXDDRTMR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth=getAuth();
// export const db=getFirestore(app);
// export default app;
// export {   signInWithEmailAndPassword , createUserWithEmailAndPassword}