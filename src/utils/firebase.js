// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJAnEFcbP5YZj1duexV_HGZyivDGutBaw",
  authDomain: "instantshow-167a5.firebaseapp.com",
  projectId: "instantshow-167a5",
  storageBucket: "instantshow-167a5.appspot.com",
  messagingSenderId: "1009756034661",
  appId: "1:1009756034661:web:c73d3eeb5945edcf56588c",
  measurementId: "G-KXK34JVVV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);